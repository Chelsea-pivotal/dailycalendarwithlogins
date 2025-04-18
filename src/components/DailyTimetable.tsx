import React, { useState } from 'react';
import { Todo } from '../types';

interface DailyTimetableProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  filter: string;
  categoryFilter: string;
}

const DailyTimetable: React.FC<DailyTimetableProps> = ({
  todos,
  onToggle,
  onEdit,
  filter,
  categoryFilter
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    
    // Filter by selected date if the todo has a scheduled date
    if (todo.scheduledDate && todo.scheduledDate !== selectedDate) return false;
    
    return true;
  });

  // Generate time slots for 24 hours
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : `${i}`;
    return `${hour}:00`;
  });

  // Find todos for each time slot
  const getTodosForTimeSlot = (timeSlot: string) => {
    const hour = parseInt(timeSlot.split(':')[0]);
    
    return filteredTodos.filter(todo => {
      // Check if todo has a specific time
      if (todo.scheduledTime) {
        const todoHour = parseInt(todo.scheduledTime.split(':')[0]);
        return todoHour === hour;
      }
      
      // Check if todo has a time range that includes this hour
      if (todo.startTime && todo.endTime) {
        const startHour = parseInt(todo.startTime.split(':')[0]);
        const endHour = parseInt(todo.endTime.split(':')[0]);
        return hour >= startHour && hour <= endHour;
      }
      
      return false;
    });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-morandi-stone">Daily Timetable</h2>
        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 bg-white border border-morandi-fog rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-morandi-sage"
        />
      </div>
      
      <div className="bg-white rounded-lg border border-morandi-fog overflow-hidden">
        {timeSlots.map((timeSlot, index) => {
          const todosInSlot = getTodosForTimeSlot(timeSlot);
          const isCurrentHour = new Date().getHours() === parseInt(timeSlot.split(':')[0]);
          
          return (
            <div 
              key={timeSlot} 
              className={`flex border-b border-morandi-fog last:border-b-0 ${
                isCurrentHour ? 'bg-morandi-sand bg-opacity-30' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="w-20 p-3 border-r border-morandi-fog flex items-center justify-center">
                <span className="text-sm font-medium text-morandi-stone">{timeSlot}</span>
              </div>
              
              <div className="flex-1 p-3">
                {todosInSlot.length === 0 ? (
                  <div className="h-6 flex items-center">
                    <span className="text-sm text-gray-400">No tasks scheduled</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {todosInSlot.map(todo => (
                      <div 
                        key={todo.id} 
                        className={`p-2 rounded-md ${
                          todo.priority === 'high' 
                            ? 'bg-red-100' 
                            : todo.priority === 'medium' 
                              ? 'bg-yellow-100' 
                              : 'bg-green-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => onToggle(todo.id)}
                              className="mr-2 h-4 w-4 text-morandi-moss rounded border-morandi-fog focus:ring-morandi-sage"
                            />
                            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                              {todo.text}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => onEdit(todo.id)}
                            className="text-xs text-morandi-stone hover:text-morandi-moss"
                          >
                            Edit
                          </button>
                        </div>
                        
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white bg-opacity-60">
                            {todo.category}
                          </span>
                          
                          {todo.startTime && todo.endTime && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-white bg-opacity-60">
                              {todo.startTime} - {todo.endTime}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTimetable;
