
import React, { useState } from 'react';
import { 
  Laptop, 
  Info, 
  Activity, 
  Circle, 
  Clock, 
  Shield, 
  Cpu, 
  HardDrive,
  RefreshCw,
  Search,
  MoreVertical,
  Terminal,
  Trash,
  Eye,
  Power
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Machine {
  id: string;
  hostname: string;
  ip: string;
  os: string;
  status: 'online' | 'offline' | 'idle';
  uptime: string;
  lastSeen: string;
  cpu: string;
  ram: string;
  disk: string;
  processes: number;
}

const mockMachines: Machine[] = [
  {
    id: '1',
    hostname: 'WIN-8KF3T25P',
    ip: '192.168.1.105',
    os: 'Windows 10 Enterprise',
    status: 'online',
    uptime: '3d 5h 12m',
    lastSeen: 'Active now',
    cpu: '32%',
    ram: '4.2 GB / 16 GB',
    disk: '256 GB / 512 GB',
    processes: 86
  },
  {
    id: '2',
    hostname: 'MAC-7JGT42L',
    ip: '192.168.1.110',
    os: 'macOS 12.4',
    status: 'online',
    uptime: '12h 45m',
    lastSeen: 'Active now',
    cpu: '18%',
    ram: '6.8 GB / 16 GB',
    disk: '125 GB / 512 GB',
    processes: 124
  },
  {
    id: '3',
    hostname: 'LNX-5HU8R12',
    ip: '192.168.1.115',
    os: 'Ubuntu 22.04 LTS',
    status: 'offline',
    uptime: '0',
    lastSeen: '2 hours ago',
    cpu: '0%',
    ram: '0 GB / 8 GB',
    disk: '120 GB / 256 GB',
    processes: 0
  },
  {
    id: '4',
    hostname: 'WIN-3JF7P22S',
    ip: '192.168.1.120',
    os: 'Windows 11 Pro',
    status: 'idle',
    uptime: '1d 8h 35m',
    lastSeen: '15 minutes ago',
    cpu: '5%',
    ram: '3.1 GB / 16 GB',
    disk: '340 GB / 1 TB',
    processes: 92
  },
  {
    id: '5',
    hostname: 'LNX-9TG4R28',
    ip: '192.168.1.125',
    os: 'Kali Linux 2022.2',
    status: 'online',
    uptime: '6h 22m',
    lastSeen: 'Active now',
    cpu: '45%',
    ram: '3.8 GB / 8 GB',
    disk: '25 GB / 128 GB',
    processes: 68
  }
];

const Machines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredMachines = mockMachines.filter(machine => 
    machine.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.os.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectMachine = (machine: Machine) => {
    setSelectedMachine(machine);
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cypher-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search machines..."
            className="cypher-input pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className="cypher-button flex items-center justify-center gap-2"
          onClick={handleRefresh}
        >
          <RefreshCw size={16} className={cn(isLoading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>
      
      {selectedMachine ? (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Laptop size={20} className="text-cypher-accent" />
              {selectedMachine.hostname}
              <span 
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  selectedMachine.status === 'online' ? "bg-cypher-success/20 text-cypher-success" :
                  selectedMachine.status === 'idle' ? "bg-cypher-warning/20 text-cypher-warning" :
                  "bg-cypher-danger/20 text-cypher-danger"
                )}
              >
                {selectedMachine.status}
              </span>
            </h3>
            <button 
              className="text-cypher-text-muted hover:text-white"
              onClick={() => setSelectedMachine(null)}
            >
              Back to list
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="cypher-card">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <Info size={16} className="text-cypher-accent" />
                System Information
              </h4>
              <div className="space-y-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-sm text-cypher-text-muted">OS:</span>
                  <span className="text-sm">{selectedMachine.os}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-cypher-text-muted">IP Address:</span>
                  <span className="text-sm">{selectedMachine.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-cypher-text-muted">Uptime:</span>
                  <span className="text-sm">{selectedMachine.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-cypher-text-muted">Last Seen:</span>
                  <span className="text-sm">{selectedMachine.lastSeen}</span>
                </div>
              </div>
            </div>
            
            <div className="cypher-card">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <Activity size={16} className="text-cypher-accent" />
                Resource Usage
              </h4>
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-cypher-text-muted">CPU:</span>
                    <span className="text-sm">{selectedMachine.cpu}</span>
                  </div>
                  <div className="w-full bg-cypher-dark rounded-full h-2">
                    <div 
                      className="bg-cypher-accent h-2 rounded-full"
                      style={{ width: selectedMachine.cpu }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-cypher-text-muted">RAM:</span>
                    <span className="text-sm">{selectedMachine.ram}</span>
                  </div>
                  <div className="w-full bg-cypher-dark rounded-full h-2">
                    <div 
                      className="bg-cypher-success h-2 rounded-full"
                      style={{ width: `${(parseInt(selectedMachine.ram.split(' / ')[0]) / parseInt(selectedMachine.ram.split(' / ')[1])) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-cypher-text-muted">Disk:</span>
                    <span className="text-sm">{selectedMachine.disk}</span>
                  </div>
                  <div className="w-full bg-cypher-dark rounded-full h-2">
                    <div 
                      className="bg-cypher-warning h-2 rounded-full"
                      style={{ width: `${(parseInt(selectedMachine.disk.split(' / ')[0]) / parseInt(selectedMachine.disk.split(' / ')[1])) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-cypher-text-muted">Processes:</span>
                  <span className="text-sm">{selectedMachine.processes}</span>
                </div>
              </div>
            </div>
            
            <div className="cypher-card">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <Shield size={16} className="text-cypher-accent" />
                Actions
              </h4>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="cypher-button flex items-center justify-center gap-2">
                  <Terminal size={16} />
                  <span>Terminal</span>
                </button>
                <button className="cypher-button flex items-center justify-center gap-2">
                  <Eye size={16} />
                  <span>Monitor</span>
                </button>
                <button className="cypher-button-secondary flex items-center justify-center gap-2">
                  <Power size={16} />
                  <span>Shutdown</span>
                </button>
                <button className="cypher-button-secondary flex items-center justify-center gap-2 text-cypher-danger">
                  <Trash size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Process list */}
          <div className="cypher-card">
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-cypher-accent" />
              Active Processes
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-cypher-text-muted border-b border-white/5">
                    <th className="pb-2 text-left font-medium">PID</th>
                    <th className="pb-2 text-left font-medium">Name</th>
                    <th className="pb-2 text-left font-medium">Memory</th>
                    <th className="pb-2 text-left font-medium">CPU</th>
                    <th className="pb-2 text-left font-medium">User</th>
                    <th className="pb-2 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMachine.status !== 'offline' && Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-white/5 text-sm">
                      <td className="py-3">{Math.floor(Math.random() * 9000) + 1000}</td>
                      <td className="py-3">{['explorer.exe', 'chrome.exe', 'svchost.exe', 'cypher-agent.exe', 'system'][index]}</td>
                      <td className="py-3">{Math.floor(Math.random() * 500) + 10} MB</td>
                      <td className="py-3">{Math.floor(Math.random() * 10) + 1}%</td>
                      <td className="py-3">SYSTEM</td>
                      <td className="py-3 text-right">
                        <button className="p-1 rounded hover:bg-cypher-light text-cypher-text-muted hover:text-white">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {selectedMachine.status === 'offline' && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-cypher-text-muted">
                        Machine is offline. No active processes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="cypher-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-cypher-text-muted border-b border-white/5">
                  <th className="pb-4 text-left font-medium">Status</th>
                  <th className="pb-4 text-left font-medium">Hostname</th>
                  <th className="pb-4 text-left font-medium">IP Address</th>
                  <th className="pb-4 text-left font-medium">OS</th>
                  <th className="pb-4 text-left font-medium">Uptime</th>
                  <th className="pb-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMachines.length > 0 ? (
                  filteredMachines.map((machine) => (
                    <tr 
                      key={machine.id} 
                      className="border-b border-white/5 text-sm hover:bg-cypher-dark/50 cursor-pointer"
                      onClick={() => handleSelectMachine(machine)}
                    >
                      <td className="py-4">
                        <div 
                          className={cn(
                            "status-indicator",
                            machine.status === 'online' ? "status-online" :
                            machine.status === 'idle' ? "status-idle" :
                            "status-offline"
                          )}
                        ></div>
                      </td>
                      <td className="py-4 font-medium">{machine.hostname}</td>
                      <td className="py-4">{machine.ip}</td>
                      <td className="py-4">{machine.os}</td>
                      <td className="py-4 flex items-center gap-1">
                        <Clock size={14} className="text-cypher-text-muted" />
                        <span>{machine.uptime}</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-1 rounded hover:bg-cypher-light text-cypher-text-muted hover:text-white">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-cypher-text-muted">
                      No machines found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Machines;
