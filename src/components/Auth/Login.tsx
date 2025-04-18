import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error, emailConfirmationRequired } = await signUp(email, password);
        
        if (error) {
          setError(error.message);
        } else if (emailConfirmationRequired) {
          setConfirmationSent(true);
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (confirmationSent) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-morandi-fog">
        <h2 className="text-2xl font-bold text-center text-morandi-stone mb-6">
          Check Your Email
        </h2>
        <p className="text-morandi-stone mb-4 text-center">
          We've sent a confirmation link to <strong>{email}</strong>.
        </p>
        <p className="text-morandi-stone mb-6 text-center">
          Please check your email and click the link to complete your registration.
        </p>
        <button
          onClick={() => {
            setConfirmationSent(false);
            setIsSignUp(false);
          }}
          className="w-full bg-morandi-sage text-white py-2 px-4 rounded-md hover:bg-morandi-sage/90 transition-colors"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-morandi-fog">
      <h2 className="text-2xl font-bold text-center text-morandi-stone mb-6">
        {isSignUp ? 'Create an Account' : 'Sign In'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-morandi-stone mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-morandi-fog rounded-md focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-morandi-stone mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-morandi-fog rounded-md focus:outline-none focus:ring-2 focus:ring-morandi-sage"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-morandi-sage text-white py-2 px-4 rounded-md hover:bg-morandi-sage/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-morandi-sage hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Login;
