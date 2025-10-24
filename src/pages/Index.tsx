
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login after a brief display of the loading screen
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cypher-darker">
      <div className="animate-fade-in text-center">
        <div className="w-24 h-24 rounded-2xl bg-cypher-accent flex items-center justify-center mb-6 mx-auto animate-pulse-slow">
          <Shield size={48} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">CypherTrax</h1>
        <p className="text-cypher-text-muted mb-8">Command Center</p>
        <div className="w-12 h-1 bg-cypher-accent mx-auto animate-pulse-slow rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
