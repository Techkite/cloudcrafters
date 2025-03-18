
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToFavorites, removeFromFavorites, isInFavorites } from '@/services/weatherService';

interface FavoriteButtonProps {
  city: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ city }) => {
  const [isFavorite, setIsFavorite] = React.useState(() => isInFavorites(city));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(city);
    } else {
      addToFavorites(city);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className="absolute top-3 right-3 bg-white/10 backdrop-blur-md hover:bg-white/20"
    >
      <Heart
        className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
      />
      <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
    </Button>
  );
};

export default FavoriteButton;
