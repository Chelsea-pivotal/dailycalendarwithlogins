import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

const WeeklyGoals: React.FC = () => {
  const [goals, setGoals] = useLocalStorage<Goal[]>('weekly-goals', []);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal,
      completed: false
    };
    
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const resetGoals = () => {
    if (window.confirm('Are you sure you want to reset all weekly goals?')) {
      setGoals([]);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-soft border border-morandi-fog">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-morandi-stone">Weekly Goals</h3>
        
        <button
          onClick={resetGoals}
          className="px-3 py-1 bg-morandi-fog text-sm text-gray-700 rounded-md hover:bg-morandi-stone hover:text-white transition-all"
        >
          Reset Goals
        </button>
      </div>
      
      <form onSubmit={addGoal} className="mb-4 flex">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new weekly goal..."
          className="flex-1 px-4 py-2 rounded-l-md border border-morandi-fog focus:outline-none focus:ring-2 focus:ring-morandi-sage"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-morandi-moss text-white rounded-r-md hover:bg-opacity-90 transition-all"
        >
          Add
        </button>
      </form>
      
      {goals.length === 0 ? (
        <div className="text-center py-6 bg-morandi-sand bg-opacity-30 rounded-lg">
          <p className="text-morandi-stone">No weekly goals set. Add some goals to track your progress!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map(goal => (
            <div 
              key={goal.id} 
              className="flex items-center justify-between p-3 bg-morandi-sand bg-opacity-20 rounded-lg"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                  className="mr-3 h-5 w-5 text-morandi-moss rounded border-morandi-fog focus:ring-morandi-sage"
                />
                <span className={goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {goal.text}
                </span>
              </div>
              
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-morandi-stone hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
          
          <div className="mt-4 pt-3 border-t border-morandi-fog">
            <div className="flex justify-between items-center">
              <span className="text-sm text-morandi-stone">
                {goals.filter(goal => goal.completed).length} of {goals.length} goals completed
              </span>
              
              <div className="w-32 bg-morandi-sand rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-morandi-moss to-morandi-sage h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${goals.length > 0 
                      ? Math.round((goals.filter(goal => goal.completed).length / goals.length) * 100) 
                      : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyGoals;
