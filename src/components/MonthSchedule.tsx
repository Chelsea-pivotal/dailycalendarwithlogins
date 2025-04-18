import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface MonthScheduleProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  filter: string;
  categoryFilter: string;
}

const MonthSchedule: React.FC<MonthScheduleProps> = ({
  todos,
  onToggle,
  onEdit,
  filter,
  categoryFilter
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<{ date: Date | null, isCurrentMonth: boolean }>>([]);

  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Calculate total days to show (previous month + current month + next month)
    const totalDays = 42; // 6 rows of 7 days
    
    const days: Array<{ date: Date | null, isCurrentMonth: boolean }> = [];
    
    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month
    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    setCalendarDays(days);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentMonth(newDate);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const getTodosForDate = (date: Date | null) => {
    if (!date) return [];
    
    const dateString = formatDate(date);
    
    return todos.filter(todo => {
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;
      if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
      return todo.scheduledDate === dateString;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-morandi-stone">Month Schedule</h2>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="px-3 py-1 bg-white border border-morandi-fog rounded-md text-sm hover:bg-morandi-fog transition-colors"
          >
            Previous
          </button>
          
          <h3 className="text-lg font-medium text-morandi-stone">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="px-3 py-1 bg-white border border-morandi-fog rounded-md text-sm hover:bg-morandi-fog transition-colors"
          >
            Next
          </button>
          
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 bg-morandi-moss text-white rounded-md text-sm hover:bg-opacity-90 transition-colors"
          >
            Today
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-morandi-fog overflow-hidden">
        <div className="grid grid-cols-7 bg-morandi-fog">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-morandi-stone">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const todosForDay = getTodosForDate(day.date);
            
            return (
              <div 
                key={index} 
                className={`border-t border-r border-morandi-fog p-1 min-h-[100px] ${
                  !day.isCurrentMonth ? 'bg-gray-50 opacity-50' : ''
                } ${isToday(day.date) ? 'bg-morandi-sand bg-opacity-30' : ''}`}
              >
                <div className="text-right mb-1">
                  <span className={`inline-block rounded-full w-6 h-6 text-center leading-6 text-sm ${
                    isToday(day.date) ? 'bg-morandi-moss text-white' : ''
                  }`}>
                    {day.date?.getDate()}
                  </span>
                </div>
                
                <div className="overflow-y-auto max-h-[80px]">
                  {todosForDay.slice(0, 3).map(todo => (
                    <div 
                      key={todo.id} 
                      className={`mb-1 p-1 rounded text-xs truncate cursor-pointer ${
                        todo.priority === 'high' 
                          ? 'bg-red-100' 
                          : todo.priority === 'medium' 
                            ? 'bg-yellow-100' 
                            : 'bg-green-100'
                      } ${todo.completed ? 'line-through opacity-50' : ''}`}
                      onClick={() => onEdit(todo.id)}
                    >
                      {todo.text}
                    </div>
                  ))}
                  
                  {todosForDay.length > 3 && (
                    <div className="text-xs text-center text-morandi-stone">
                      +{todosForDay.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthSchedule;
