
import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (username === 'cyphertrax' && password === 'IAMCYPHERTRAX') {
        // Store authentication status in localStorage
        localStorage.setItem('cyphertrax-auth', 'true');
        // Trigger storage event for App.tsx to detect
        window.dispatchEvent(new Event('storage'));
        
        toast({
          title: "Login successful",
          description: "Welcome to CypherTrax Command Center",
        });
        
        navigate('/dashboard');
      } else {
        setError('Invalid username or password.');
        setIsLoading(false);
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cypher-darker p-4">
      <div className="glass max-w-md w-full p-8 rounded-xl animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-cypher-accent flex items-center justify-center mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CypherTrax</h1>
          <p className="text-sm text-cypher-text-muted mt-1">Command Center Access</p>
        </div>
        
        {error && (
          <div className="bg-cypher-danger/10 border border-cypher-danger/20 rounded-lg p-3 mb-6 animate-fade-in">
            <p className="text-sm text-cypher-danger">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <input
                type="text"
                id="username"
                className="cypher-input w-full"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="cypher-input w-full pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cypher-text-muted hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="cypher-button w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-cypher-text-muted">
            Protected system. Unauthorized access prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
