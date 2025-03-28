
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { User, MapPin, Mail, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getRecentSearches } from '@/services/weatherService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const recentSearches = getRecentSearches();

  const handleRecentSearch = (city: string) => {
    navigate('/', { state: { city } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <User className="w-8 h-8 text-white mr-3" />
          <h1 className="text-3xl font-bold text-white">Profile</h1>
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
          <div className="flex flex-col items-center text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <div className="flex items-center text-white/80 mb-6">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Location set to: London</span>
            </div>
            <div className="w-full">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 mr-3" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-6 bg-white/10 backdrop-blur-md border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Searches
          </h3>
          {recentSearches.length > 0 ? (
            <div className="space-y-3">
              {recentSearches.map((city, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between text-white/80 cursor-pointer hover:text-white"
                  onClick={() => handleRecentSearch(city)}
                >
                  <span>{city}</span>
                  <MapPin className="w-4 h-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-white/60 text-center py-2">
              No recent searches
            </div>
          )}
        </Card>
      </div>
      
      {isMobile && <Navigation />}
    </div>
  );
};

export default Profile;
