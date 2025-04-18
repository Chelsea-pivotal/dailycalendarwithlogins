import React from 'react';
import { Todo } from '../types';

interface ProgressBarProps {
  todos: Todo[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const progress = todos.length > 0 
    ? Math.round((completedTodos.length / todos.length) * 100) 
    : 0;
  
  let message = '';
  if (progress === 0) {
    message = "Let's get started on your tasks!";
  } else if (progress < 25) {
    message = "You're making progress! Keep going!";
  } else if (progress < 50) {
    message = "You're on your way! Keep up the good work!";
  } else if (progress < 75) {
    message = "More than halfway there! You're doing great!";
  } else if (progress < 100) {
    message = "Almost there! Just a few more tasks to go!";
  } else {
    message = "Congratulations! You've completed all your tasks!";
  }

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-soft border border-morandi-fog">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-morandi-stone">Your Progress</h3>
        <span className="text-morandi-stone font-medium">{progress}%</span>
      </div>
      
      <div className="w-full bg-morandi-sand rounded-full h-4 mb-3">
        <div 
          className="bg-gradient-to-r from-morandi-moss to-morandi-sage h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-morandi-stone text-sm">{message}</p>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="bg-morandi-sand bg-opacity-30 p-3 rounded-lg">
          <p className="text-2xl font-semibold text-morandi-stone">{completedTodos.length}</p>
          <p className="text-xs text-morandi-stone">Completed</p>
        </div>
        
        <div className="bg-morandi-sand bg-opacity-30 p-3 rounded-lg">
          <p className="text-2xl font-semibold text-morandi-stone">{todos.length - completedTodos.length}</p>
          <p className="text-xs text-morandi-stone">Remaining</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
