
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, User, Settings, Heart } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex justify-around">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Home className="w-6 h-6 text-white" />
            <span className="nav-item-text text-white">Weather</span>
          </Link>
          
          <Link to="/favorites" className={`nav-item ${isActive('/favorites') ? 'active' : ''}`}>
            <Heart className="w-6 h-6 text-white" />
            <span className="nav-item-text text-white">Favorites</span>
          </Link>
          
          <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
            <User className="w-6 h-6 text-white" />
            <span className="nav-item-text text-white">Profile</span>
          </Link>
          
          <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
            <Settings className="w-6 h-6 text-white" />
            <span className="nav-item-text text-white">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
