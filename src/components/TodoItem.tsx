import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const categoryColors = {
    work: 'bg-morandi-sky text-blue-800',
    personal: 'bg-morandi-blush text-pink-800',
    health: 'bg-morandi-sage text-green-800',
    learning: 'bg-morandi-lavender text-purple-800',
    errands: 'bg-morandi-terracotta text-orange-800'
  };

  return (
    <div className={`p-4 mb-3 rounded-lg border border-morandi-fog shadow-soft transition-all ${
      todo.completed ? 'bg-gray-50 opacity-70' : 'bg-white'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 h-5 w-5 text-morandi-moss rounded border-morandi-fog focus:ring-morandi-sage"
          />
          
          <div>
            <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
              
              <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[todo.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
                {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
              </span>
              
              {todo.scheduledDate && (
                <span className="text-xs px-2 py-1 rounded-full bg-morandi-fog text-gray-700">
                  {new Date(todo.scheduledDate).toLocaleDateString()}
                </span>
              )}
              
              {todo.scheduledTime && (
                <span className="text-xs px-2 py-1 rounded-full bg-morandi-fog text-gray-700">
                  {todo.scheduledTime}
                </span>
              )}
              
              {todo.startTime && todo.endTime && (
                <span className="text-xs px-2 py-1 rounded-full bg-morandi-fog text-gray-700">
                  {todo.startTime} - {todo.endTime}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo.id)}
            className="text-morandi-stone hover:text-morandi-moss transition-colors p-1"
          >
            Edit
          </button>
          
          <button
            onClick={() => onDelete(todo.id)}
            className="text-morandi-stone hover:text-red-500 transition-colors p-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
