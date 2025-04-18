import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface SuccessCelebrationProps {
  todos: Todo[];
}

const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({ todos }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  useEffect(() => {
    const completedCount = todos.filter(todo => todo.completed).length;
    
    // Check if we've completed a new task
    if (completedCount > completedTaskCount && completedCount > 0) {
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    setCompletedTaskCount(completedCount);
  }, [todos, completedTaskCount]);

  if (!showCelebration) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center transform scale-110 animate-bounce">
        <h2 className="text-2xl font-bold text-morandi-moss mb-2">Great job!</h2>
        <p className="text-morandi-stone">You completed a task! Keep up the good work!</p>
      </div>
    </div>
  );
};

export default SuccessCelebration;
