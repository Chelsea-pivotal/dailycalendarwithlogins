import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface EisenhowerMatrixProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  filter: string;
  categoryFilter: string;
}

const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  filter,
  categoryFilter
}) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    return true;
  });

  const urgentImportant = filteredTodos.filter(todo => todo.priority === 'high');
  const notUrgentImportant = filteredTodos.filter(todo => todo.priority === 'medium');
  const urgentNotImportant = filteredTodos.filter(todo => todo.priority === 'low' && todo.scheduledDate);
  const notUrgentNotImportant = filteredTodos.filter(todo => todo.priority === 'low' && !todo.scheduledDate);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-morandi-stone mb-6">Eisenhower Matrix</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-4 rounded-lg border border-morandi-fog">
          <h3 className="text-lg font-medium mb-3 text-red-700">Urgent & Important</h3>
          <div className="space-y-2">
            {urgentImportant.length === 0 ? (
              <p className="text-sm text-morandi-stone">No tasks in this quadrant</p>
            ) : (
              urgentImportant.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-morandi-fog">
          <h3 className="text-lg font-medium mb-3 text-yellow-700">Not Urgent & Important</h3>
          <div className="space-y-2">
            {notUrgentImportant.length === 0 ? (
              <p className="text-sm text-morandi-stone">No tasks in this quadrant</p>
            ) : (
              notUrgentImportant.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-morandi-fog">
          <h3 className="text-lg font-medium mb-3 text-blue-700">Urgent & Not Important</h3>
          <div className="space-y-2">
            {urgentNotImportant.length === 0 ? (
              <p className="text-sm text-morandi-stone">No tasks in this quadrant</p>
            ) : (
              urgentNotImportant.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-morandi-fog">
          <h3 className="text-lg font-medium mb-3 text-green-700">Not Urgent & Not Important</h3>
          <div className="space-y-2">
            {notUrgentNotImportant.length === 0 ? (
              <p className="text-sm text-morandi-stone">No tasks in this quadrant</p>
            ) : (
              notUrgentNotImportant.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EisenhowerMatrix;
