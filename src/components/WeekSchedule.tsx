import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface WeekScheduleProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  filter: string;
  categoryFilter: string;
}

const WeekSchedule: React.FC<WeekScheduleProps> = ({
  todos,
  onToggle,
  onEdit,
  filter,
  categoryFilter
}) => {
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());

  useEffect(() => {
    generateWeekDates(currentWeekStart);
  }, [currentWeekStart]);

  const generateWeekDates = (startDate: Date) => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    
    // Adjust to start from Monday
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    currentDate.setDate(diff);
    
    // Generate dates for the week
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setWeekDates(dates);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeekStart(newDate);
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTodosForDate = (date: string) => {
    return todos.filter(todo => {
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
      return todo.scheduledDate === date;
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-morandi-stone">Week Schedule</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigateWeek('prev')}
            className="px-3 py-1 bg-white border border-morandi-fog rounded-md text-sm hover:bg-morandi-fog transition-colors"
          >
            Previous Week
          </button>
          
          <button
            onClick={() => {
              setCurrentWeekStart(new Date());
            }}
            className="px-3 py-1 bg-white border border-morandi-fog rounded-md text-sm hover:bg-morandi-fog transition-colors"
          >
            Current Week
          </button>
          
          <button
            onClick={() => navigateWeek('next')}
            className="px-3 py-1 bg-white border border-morandi-fog rounded-md text-sm hover:bg-morandi-fog transition-colors"
          >
            Next Week
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {weekDates.map(date => (
          <div 
            key={date} 
            className={`border border-morandi-fog rounded-lg overflow-hidden ${
              isToday(date) ? 'ring-2 ring-morandi-moss' : ''
            }`}
          >
            <div className={`p-2 text-center ${
              isToday(date) ? 'bg-morandi-moss text-white' : 'bg-morandi-fog'
            }`}>
              <div className="font-medium">{getDayName(date)}</div>
              <div className="text-sm">{getFormattedDate(date)}</div>
            </div>
            
            <div className="p-2 bg-white min-h-[150px] max-h-[300px] overflow-y-auto">
              {getTodosForDate(date).length === 0 ? (
                <p className="text-sm text-gray-400 text-center mt-4">No tasks</p>
              ) : (
                <div className="space-y-2">
                  {getTodosForDate(date).map(todo => (
                    <div 
                      key={todo.id} 
                      className={`p-2 rounded-md text-sm ${
                        todo.priority === 'high' 
                          ? 'bg-red-100' 
                          : todo.priority === 'medium' 
                            ? 'bg-yellow-100' 
                            : 'bg-green-100'
                      }`}
                    >
                      <div className="flex items-start space-x-1">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => onToggle(todo.id)}
                          className="mt-0.5 h-3 w-3 text-morandi-moss rounded border-morandi-fog focus:ring-morandi-sage"
                        />
                        <div>
                          <div className={todo.completed ? 'line-through text-gray-500' : ''}>
                            {todo.text}
                          </div>
                          
                          {todo.scheduledTime && (
                            <div className="text-xs text-gray-600 mt-1">
                              {todo.scheduledTime}
                            </div>
                          )}
                          
                          <div className="flex mt-1">
                            <span 
                              className="text-xs px-1 py-0.5 rounded-full bg-white bg-opacity-60 mr-1"
                              onClick={() => onEdit(todo.id)}
                            >
                              Edit
                            </span>
                            <span className="text-xs px-1 py-0.5 rounded-full bg-white bg-opacity-60">
                              {todo.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekSchedule;
