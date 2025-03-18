
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveToRecentSearches } from '@/services/weatherService';

interface SearchBarProps {
  onSearch: (city: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      saveToRecentSearches(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 
                    bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/70"
        />
        <Button 
          type="submit" 
          className="rounded-l-none bg-white/20 backdrop-blur-md border-white/20 hover:bg-white/30"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
