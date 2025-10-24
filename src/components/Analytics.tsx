
import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Map, 
  Activity,
  Calendar,
  List,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const mockSessionData = [
  { date: '2023-09-01', sessions: 24 },
  { date: '2023-09-02', sessions: 18 },
  { date: '2023-09-03', sessions: 30 },
  { date: '2023-09-04', sessions: 45 },
  { date: '2023-09-05', sessions: 32 },
  { date: '2023-09-06', sessions: 38 },
  { date: '2023-09-07', sessions: 42 },
];

const mockCommandData = [
  { name: 'sysinfo', count: 86 },
  { name: 'dir/ls', count: 132 },
  { name: 'ps', count: 65 },
  { name: 'download', count: 47 },
  { name: 'screenshot', count: 28 },
  { name: 'keylog', count: 53 },
];

const mockCountryData = [
  { name: 'United States', value: 45 },
  { name: 'Germany', value: 20 },
  { name: 'China', value: 15 },
  { name: 'Russia', value: 10 },
  { name: 'Brazil', value: 5 },
  { name: 'Other', value: 5 },
];

const mockTimeData = [
  { time: '00:00', connections: 5 },
  { time: '04:00', connections: 2 },
  { time: '08:00', connections: 12 },
  { time: '12:00', connections: 18 },
  { time: '16:00', connections: 24 },
  { time: '20:00', connections: 16 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <BarChart2 size={20} className="text-cypher-accent" />
          System Analytics
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="cypher-card bg-cypher-dark flex items-center gap-2 py-2">
            <Calendar size={16} className="ml-2 text-cypher-text-muted" />
            <select className="bg-transparent border-none outline-none text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <button className="cypher-button-secondary flex items-center gap-2 py-2">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      {/* Activity and commands charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-cypher-accent" />
            Active Sessions Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockSessionData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }} 
                  stroke="#1e293b"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis tick={{ fill: '#94a3b8' }} stroke="#1e293b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111218', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    color: '#f8fafc'
                  }} 
                  formatter={(value) => [`${value} sessions`, 'Active Sessions']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return `${date.toLocaleDateString()}`;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff' }}
                  fillOpacity={1} 
                  fill="url(#sessionGradient)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <List size={16} className="text-cypher-accent" />
            Most Used Commands
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockCommandData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} stroke="#1e293b" />
                <YAxis tick={{ fill: '#94a3b8' }} stroke="#1e293b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111218', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    color: '#f8fafc'
                  }} 
                  formatter={(value) => [`${value} executions`, 'Count']}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Country distribution and time activity charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '300ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Map size={16} className="text-cypher-accent" />
            Geographical Distribution
          </h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCountryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {mockCountryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111218', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    color: '#f8fafc'
                  }} 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="cypher-card animate-fade-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Activity size={16} className="text-cypher-accent" />
            Connection Activity by Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockTimeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  formatter={(value) => [`${value} connections`, 'Connections']}
                />
                <Area 
                  type="monotone" 
                  dataKey="connections" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#timeGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
