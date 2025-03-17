
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Navigation from '@/components/Navigation';
import { Settings as SettingsIcon, Bell, Globe, ThermometerSun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Settings = () => {
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="w-8 h-8 text-white mr-3" />
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-3" />
                <span>Location Services</span>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <ThermometerSun className="w-5 h-5 mr-3" />
                <span>Temperature Unit (°C)</span>
              </div>
              <Switch />
            </div>
          </Card>

          <button
            onClick={logout}
            className="w-full mt-8 py-3 text-white bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      
      {isMobile && <Navigation />}
    </div>
  );
};

export default Settings;
