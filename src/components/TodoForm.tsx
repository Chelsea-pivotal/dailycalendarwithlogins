import React, { useState, useEffect } from 'react';

interface TodoFormProps {
  addTodo: (
    text: string, 
    category: string, 
    priority: string, 
    scheduledDate?: string, 
    scheduledTime?: string,
    startTime?: string,
    endTime?: string
  ) => void;
  editingTodo: { 
    id: string; 
    text: string; 
    category: string; 
    priority: string;
    scheduledDate?: string;
    scheduledTime?: string;
    startTime?: string;
    endTime?: string;
  } | null;
  updateTodo: (
    id: string, 
    text: string, 
    category: string, 
    priority: string,
    scheduledDate?: string,
    scheduledTime?: string,
    startTime?: string,
    endTime?: string
  ) => void;
  cancelEdit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ 
  addTodo, 
  editingTodo, 
  updateTodo, 
  cancelEdit 
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isTimeRangeEnabled, setIsTimeRangeEnabled] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setCategory(editingTodo.category);
      setPriority(editingTodo.priority);
      setScheduledDate(editingTodo.scheduledDate || '');
      setScheduledTime(editingTodo.scheduledTime || '');
      setStartTime(editingTodo.startTime || '');
      setEndTime(editingTodo.endTime || '');
      setIsTimeRangeEnabled(Boolean(editingTodo.startTime && editingTodo.endTime));
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setText('');
    setCategory('work');
    setPriority('medium');
    setScheduledDate('');
    setScheduledTime('');
    setStartTime('');
    setEndTime('');
    setIsTimeRangeEnabled(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    if (editingTodo) {
      updateTodo(
        editingTodo.id, 
        text, 
        category, 
        priority, 
        scheduledDate || undefined, 
        scheduledTime || undefined,
        isTimeRangeEnabled ? startTime || undefined : undefined,
        isTimeRangeEnabled ? endTime || undefined : undefined
      );
    } else {
      addTodo(
        text, 
        category, 
        priority, 
        scheduledDate || undefined, 
        scheduledTime || undefined,
        isTimeRangeEnabled ? startTime || undefined : undefined,
        isTimeRangeEnabled ? endTime || undefined : undefined
      );
      resetForm();
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-soft border border-morandi-fog">
      <h2 className="text-xl font-semibold mb-4 text-morandi-stone">
        {editingTodo ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-morandi-stone mb-1">
            Task Description
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-morandi-stone mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="errands">Errands</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-morandi-stone mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium text-morandi-stone mb-1">
              Date (Optional)
            </label>
            <input
              type="date"
              id="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            />
          </div>
          
          <div>
            <label htmlFor="scheduledTime" className="block text-sm font-medium text-morandi-stone mb-1">
              Time (Optional)
            </label>
            <input
              type="time"
              id="scheduledTime"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="timeRangeToggle"
            checked={isTimeRangeEnabled}
            onChange={(e) => setIsTimeRangeEnabled(e.target.checked)}
            className="mr-2 h-4 w-4 text-morandi-moss focus:ring-morandi-sage border-morandi-fog rounded"
          />
          <label htmlFor="timeRangeToggle" className="text-sm font-medium text-morandi-stone">
            Set time range for this task
          </label>
        </div>
        
        {isTimeRangeEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-morandi-stone mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
              />
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-morandi-stone mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2">
          {editingTodo && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-morandi-fog text-gray-700 rounded-md hover:bg-morandi-stone hover:text-white transition-all"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-morandi-moss text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            {editingTodo ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
