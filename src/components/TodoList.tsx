import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  viewMode: 'list' | 'matrix' | 'timetable' | 'week' | 'month';
  setViewMode: (mode: 'list' | 'matrix' | 'timetable' | 'week' | 'month') => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  viewMode,
  setViewMode
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    return true;
  });

  const categories = ['all', 'work', 'personal', 'health', 'learning', 'errands'];

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold text-morandi-stone mb-4 md:mb-0">Your Tasks</h2>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-morandi-fog rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-morandi-sage"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-morandi-fog rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-morandi-sage"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <div className="flex rounded-md overflow-hidden border border-morandi-fog">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${
                viewMode === 'list' 
                  ? 'bg-morandi-moss text-white' 
                  : 'bg-white text-morandi-stone hover:bg-morandi-fog'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-2 text-sm ${
                viewMode === 'matrix' 
                  ? 'bg-morandi-moss text-white' 
                  : 'bg-white text-morandi-stone hover:bg-morandi-fog'
              }`}
            >
              Matrix
            </button>
            <button
              onClick={() => setViewMode('timetable')}
              className={`px-3 py-2 text-sm ${
                viewMode === 'timetable' 
                  ? 'bg-morandi-moss text-white' 
                  : 'bg-white text-morandi-stone hover:bg-morandi-fog'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 text-sm ${
                viewMode === 'week' 
                  ? 'bg-morandi-moss text-white' 
                  : 'bg-white text-morandi-stone hover:bg-morandi-fog'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 text-sm ${
                viewMode === 'month' 
                  ? 'bg-morandi-moss text-white' 
                  : 'bg-white text-morandi-stone hover:bg-morandi-fog'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      {viewMode === 'list' && (
        <div>
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 bg-morandi-sand bg-opacity-30 rounded-lg border border-morandi-fog">
              <p className="text-morandi-stone">No tasks found. Add some tasks to get started!</p>
            </div>
          ) : (
            <div>
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
