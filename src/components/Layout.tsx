
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Laptop, TerminalSquare, BarChart2, Shield, Settings, LogOut, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 h-full bg-cypher-dark border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-cypher-accent flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">CypherTrax</h1>
            <p className="text-xs text-cypher-text-muted">Command Center</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/" className={cn("nav-link", isActive("/") && "active")}>
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/machines" className={cn("nav-link", isActive("/machines") && "active")}>
            <Laptop size={18} />
            <span>Machines</span>
          </Link>
          <Link to="/terminal" className={cn("nav-link", isActive("/terminal") && "active")}>
            <TerminalSquare size={18} />
            <span>Terminal</span>
          </Link>
          <Link to="/analytics" className={cn("nav-link", isActive("/analytics") && "active")}>
            <BarChart2 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/settings" className={cn("nav-link", isActive("/settings") && "active")}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-cypher-accent/20 flex items-center justify-center">
              <span className="text-sm font-medium text-cypher-accent">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-cypher-text-muted">Administrator</p>
            </div>
          </div>
          <button className="nav-link w-full justify-start text-cypher-text-muted hover:text-cypher-danger">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6">
          <h2 className="text-xl font-medium">
            {location.pathname === "/" && "Dashboard"}
            {location.pathname === "/machines" && "Machines"}
            {location.pathname === "/terminal" && "Terminal"}
            {location.pathname === "/analytics" && "Analytics"}
            {location.pathname === "/settings" && "Settings"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-2 h-2 bg-cypher-success rounded-full absolute top-0 right-0"></div>
              <div className="w-8 h-8 rounded-full bg-cypher-light flex items-center justify-center">
                <span className="text-xs font-medium">5</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
