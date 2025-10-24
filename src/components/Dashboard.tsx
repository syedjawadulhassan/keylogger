
import React, { useState, useEffect } from 'react';
import { Activity, Laptop, Server, Clock, Shield, AlertCircle, Terminal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockActivityData = [
  { time: '00:00', value: 5 },
  { time: '03:00', value: 7 },
  { time: '06:00', value: 10 },
  { time: '09:00', value: 15 },
  { time: '12:00', value: 20 },
  { time: '15:00', value: 18 },
  { time: '18:00', value: 25 },
  { time: '21:00', value: 30 },
  { time: '24:00', value: 22 },
];

const mockOsData = [
  { name: 'Windows', value: 65 },
  { name: 'macOS', value: 20 },
  { name: 'Linux', value: 15 },
];

const mockActivityLogItems = [
  { id: 1, type: 'connection', message: 'New machine connected', time: '3 minutes ago', machine: 'WIN-8KF3T25P' },
  { id: 2, type: 'command', message: 'Command executed successfully', time: '10 minutes ago', machine: 'MAC-7JGT42L' },
  { id: 3, type: 'warning', message: 'Connection attempt failed', time: '22 minutes ago', machine: 'LNX-5HU8R12' },
  { id: 4, type: 'connection', message: 'Machine disconnected', time: '45 minutes ago', machine: 'WIN-9PL5Y33S' },
  { id: 5, type: 'info', message: 'System scan completed', time: '1 hour ago', machine: 'MAC-7JGT42L' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMachines, setActiveMachines] = useState(0);
  
  useEffect(() => {
    // Simulate increasing number of active machines
    const interval = setInterval(() => {
      if (activeMachines < 18) {
        setActiveMachines(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    // Update current time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [activeMachines]);
  
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cypher-accent/20 flex items-center justify-center text-cypher-accent">
              <Laptop size={24} />
            </div>
            <div>
              <h3 className="text-sm text-cypher-text-muted">Active Machines</h3>
              <p className="text-2xl font-semibold">{activeMachines}</p>
            </div>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cypher-success/20 flex items-center justify-center text-cypher-success">
              <Terminal size={24} />
            </div>
            <div>
              <h3 className="text-sm text-cypher-text-muted">Commands Executed</h3>
              <p className="text-2xl font-semibold">184</p>
            </div>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cypher-warning/20 flex items-center justify-center text-cypher-warning">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-sm text-cypher-text-muted">Alerts</h3>
              <p className="text-2xl font-semibold">7</p>
            </div>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-cypher-muted/20 flex items-center justify-center text-cypher-text-muted">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-sm text-cypher-text-muted">Current Time</h3>
              <p className="text-2xl font-semibold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="cypher-card col-span-2 animate-fade-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Activity size={16} className="text-cypher-accent" />
            Network Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockActivityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} stroke="#1e293b" />
                <YAxis tick={{ fill: '#94a3b8' }} stroke="#1e293b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111218', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    color: '#f8fafc'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#activityGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Server size={16} className="text-cypher-accent" />
            OS Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockOsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {mockOsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111218', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    color: '#f8fafc'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Activity log */}
      <div className="cypher-card animate-fade-up" style={{ animationDelay: '600ms' }}>
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Shield size={16} className="text-cypher-accent" />
          Activity Log
        </h3>
        <div className="space-y-3">
          {mockActivityLogItems.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-start gap-3 p-3 rounded-md bg-cypher-dark/50 border border-white/5 animate-fade-up"
              style={{ animationDelay: `${index * 100 + 700}ms` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.type === 'connection' ? 'bg-cypher-accent/20 text-cypher-accent' :
                item.type === 'command' ? 'bg-cypher-success/20 text-cypher-success' :
                item.type === 'warning' ? 'bg-cypher-warning/20 text-cypher-warning' :
                'bg-cypher-muted/20 text-cypher-text-muted'
              }`}>
                {item.type === 'connection' && <Laptop size={16} />}
                {item.type === 'command' && <Terminal size={16} />}
                {item.type === 'warning' && <AlertCircle size={16} />}
                {item.type === 'info' && <Activity size={16} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{item.message}</p>
                  <span className="text-xs text-cypher-text-muted">{item.time}</span>
                </div>
                <p className="text-xs text-cypher-text-muted mt-1">Machine: {item.machine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
