
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Send } from 'lucide-react';

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>('WIN-8KF3T25P');
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Mock machine data
  const machines = [
    { id: 'WIN-8KF3T25P', name: 'WIN-8KF3T25P', os: 'Windows 10', status: 'online' },
    { id: 'MAC-7JGT42L', name: 'MAC-7JGT42L', os: 'macOS 12.4', status: 'online' },
    { id: 'LNX-5HU8R12', name: 'LNX-5HU8R12', os: 'Ubuntu 22.04', status: 'offline' },
  ];
  
  // Mock command responses
  const commandResponses: Record<string, string> = {
    'help': 'Available commands: help, whoami, hostname, ipconfig, sysinfo, dir, ls, ps, clear',
    'whoami': 'Administrator',
    'hostname': selectedMachine,
    'ipconfig': `IPv4 Address. . . . . . . . . . . : 192.168.1.105
Subnet Mask . . . . . . . . . . . : 255.255.255.0
Default Gateway . . . . . . . . . : 192.168.1.1`,
    'sysinfo': `OS: ${machines.find(m => m.id === selectedMachine)?.os || 'Unknown'}
CPU: Intel Core i7-10700K @ 3.80GHz
RAM: 16.0 GB
Disk: 500GB SSD (256GB free)`,
    'dir': 'Directory of C:\\Users\\Administrator\\\n\n09/01/2023  10:15 AM    <DIR>          Documents\n09/01/2023  10:15 AM    <DIR>          Downloads\n09/01/2023  10:15 AM    <DIR>          Desktop\n09/01/2023  10:15 AM    <DIR>          Pictures\n09/01/2023  10:15 AM         5,718,018 keylogger.exe\n09/01/2023  10:15 AM           125,052 persistence.dll\n09/01/2023  10:15 AM             2,018 config.json',
    'ls': 'Documents  Downloads  Desktop  Pictures  keylogger.exe  persistence.dll  config.json',
    'ps': 'PID    COMMAND\n1      /sbin/init\n422    /usr/lib/systemd/systemd-journald\n453    /usr/lib/systemd/systemd-udevd\n552    /usr/lib/systemd/systemd-logind\n555    /usr/sbin/sshd -D\n670    /usr/sbin/cron -f\n685    cypher-agent.exe',
    'clear': '',
  };
  
  // Initialize with a welcome message
  useEffect(() => {
    const initialCommand: CommandHistory = {
      command: '',
      output: `CypherTrax Command & Control Terminal v1.0
Connected to ${selectedMachine}
Type 'help' for available commands.
`,
      timestamp: new Date(),
    };
    
    setCommandHistory([initialCommand]);
  }, [selectedMachine]);
  
  // Scroll to bottom of terminal when command history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const command = input.trim().toLowerCase();
    let output = 'Command not recognized. Type "help" for available commands.';
    
    if (command === 'clear') {
      setCommandHistory([]);
      setInput('');
      return;
    }
    
    // Check if command exists in our mock responses
    if (commandResponses[command]) {
      output = commandResponses[command];
    }
    
    const newCommand: CommandHistory = {
      command: input,
      output,
      timestamp: new Date(),
    };
    
    setCommandHistory([...commandHistory, newCommand]);
    setInput('');
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {machines.map((machine) => (
          <div 
            key={machine.id}
            className={`cypher-card cursor-pointer transition-all duration-300 ${selectedMachine === machine.id ? 'border-cypher-accent' : 'hover:border-white/10'}`}
            onClick={() => setSelectedMachine(machine.id)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{machine.name}</h3>
              <div className={`status-indicator ${machine.status === 'online' ? 'status-online' : 'status-offline'}`}></div>
            </div>
            <p className="text-sm text-cypher-text-muted mt-1">{machine.os}</p>
          </div>
        ))}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="cypher-card flex-1 terminal-text bg-cypher-darker border-white/5 p-0 overflow-hidden flex flex-col">
          <div className="p-2 bg-cypher-dark border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cypher-danger"></div>
              <div className="w-3 h-3 rounded-full bg-cypher-warning"></div>
              <div className="w-3 h-3 rounded-full bg-cypher-success"></div>
            </div>
            <span className="text-xs text-cypher-text-muted">
              {selectedMachine} - Terminal Session
            </span>
            <div className="w-4"></div>
          </div>
          
          <div 
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
          >
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command && (
                  <div className="flex items-start">
                    <span className="text-cypher-accent mr-2">
                      <ChevronRight size={16} />
                    </span>
                    <span>{item.command}</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap ml-6 text-cypher-text-muted">
                  {item.output}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="p-2 border-t border-white/5 flex items-center gap-2">
            <span className="text-cypher-accent">
              <ChevronRight size={16} />
            </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none terminal-text text-sm"
              placeholder="Type command..."
              autoFocus
            />
            <button 
              type="submit" 
              className="p-1 rounded-md hover:bg-cypher-light text-cypher-text-muted hover:text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
