import React from 'react';
import { Todo } from '../types';

interface MotivationalDashboardProps {
  todos: Todo[];
}

const MotivationalDashboard: React.FC<MotivationalDashboardProps> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const completionRate = todos.length > 0 
    ? Math.round((completedTodos.length / todos.length) * 100) 
    : 0;
  
  const todayTodos = todos.filter(todo => {
    const today = new Date().toISOString().split('T')[0];
    return todo.scheduledDate === today;
  });
  
  const completedTodayTodos = todayTodos.filter(todo => todo.completed);
  const todayCompletionRate = todayTodos.length > 0 
    ? Math.round((completedTodayTodos.length / todayTodos.length) * 100) 
    : 0;
  
  const highPriorityTodos = todos.filter(todo => todo.priority === 'high' && !todo.completed);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-morandi-sky to-morandi-lavender p-6 rounded-lg shadow-soft text-white">
        <h3 className="text-xl font-semibold mb-2">Overall Progress</h3>
        <div className="text-3xl font-bold">{completionRate}%</div>
        <p className="text-sm opacity-90 mt-1">
          {completedTodos.length} of {todos.length} tasks completed
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-morandi-sage to-morandi-moss p-6 rounded-lg shadow-soft text-white">
        <h3 className="text-xl font-semibold mb-2">Today's Tasks</h3>
        <div className="text-3xl font-bold">{todayCompletionRate}%</div>
        <p className="text-sm opacity-90 mt-1">
          {completedTodayTodos.length} of {todayTodos.length} tasks completed today
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-morandi-blush to-morandi-terracotta p-6 rounded-lg shadow-soft text-white">
        <h3 className="text-xl font-semibold mb-2">High Priority</h3>
        <div className="text-3xl font-bold">{highPriorityTodos.length}</div>
        <p className="text-sm opacity-90 mt-1">
          {highPriorityTodos.length > 0 
            ? 'High priority tasks need attention' 
            : 'No high priority tasks pending'}
        </p>
      </div>
    </div>
  );
};

export default MotivationalDashboard;
