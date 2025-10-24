
import React from 'react';
import Layout from '@/components/Layout';
import { Shield, RefreshCw, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-fade-in space-y-6">
        <h3 className="text-xl font-medium flex items-center gap-2 mb-6">
          <Shield size={20} className="text-cypher-accent" />
          System Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cypher-card col-span-2">
            <h4 className="text-sm font-medium mb-4">Command & Control Settings</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="server-address" className="text-sm">C2 Server Address</label>
                <input 
                  type="text" 
                  id="server-address" 
                  className="cypher-input w-full"
                  defaultValue="https://c2.cyphertrax.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="refresh-interval" className="text-sm">Refresh Interval (seconds)</label>
                <input 
                  type="number" 
                  id="refresh-interval" 
                  className="cypher-input w-full"
                  defaultValue={30}
                  min={5}
                  max={300}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="encryption-key" className="text-sm">Encryption Key</label>
                <input 
                  type="password" 
                  id="encryption-key" 
                  className="cypher-input w-full"
                  defaultValue="************************"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Connection Options</label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input type="checkbox" id="use-ssl" className="mr-2" defaultChecked />
                    <label htmlFor="use-ssl" className="text-sm">Use SSL/TLS</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="verify-cert" className="mr-2" defaultChecked />
                    <label htmlFor="verify-cert" className="text-sm">Verify SSL Certificate</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="compress-data" className="mr-2" defaultChecked />
                    <label htmlFor="compress-data" className="text-sm">Compress Data</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cypher-card">
            <h4 className="text-sm font-medium mb-4">System Maintenance</h4>
            
            <div className="space-y-4">
              <div>
                <button className="cypher-button w-full flex items-center justify-center gap-2">
                  <RefreshCw size={16} />
                  <span>Restart Services</span>
                </button>
              </div>
              
              <div>
                <button className="cypher-button-secondary w-full flex items-center justify-center gap-2">
                  <span>Clear Logs</span>
                </button>
              </div>
              
              <div>
                <button className="cypher-button-secondary w-full flex items-center justify-center gap-2 text-cypher-danger">
                  <span>Reset System</span>
                </button>
              </div>
              
              <div className="pt-4 mt-4 border-t border-white/5">
                <div className="text-sm text-cypher-text-muted mb-2">System Version</div>
                <div className="text-sm">CypherTrax C2 v1.0.5</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <button className="cypher-button-secondary">
            Cancel
          </button>
          <button className="cypher-button flex items-center gap-2">
            <Save size={16} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
