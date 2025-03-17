
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 bg-gradient-to-br from-weather-blue to-weather-light-blue animate-in">
      <div className="max-w-sm w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/80">Sign up to get started with Weather App</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">◌</span>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Sign Up
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-white/80">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
