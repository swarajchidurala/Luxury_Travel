import { ArrowRight, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import './DestinationCard.css';

export default function DestinationCard({ destination, onClick }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(destination.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(destination.id);
  };

  return (
    <div className="dest-card hover-lift" onClick={() => onClick(destination)}>
      <div className="dest-card-image-wrap">
        <img src={destination.image} alt={destination.name} className="dest-card-img" loading="lazy" />
        <div className="dest-card-overlay"></div>
        <button 
          className="dest-favorite-btn" 
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={favorited ? 'currentColor' : 'none'} className={favorited ? 'favorited' : ''} />
        </button>
      </div>
      <div className="dest-card-content">
        <div className="dest-card-header">
          <div>
            <h3 className="dest-card-title">{destination.name}</h3>
            <p className="dest-card-location">{destination.location}</p>
          </div>
          <ArrowRight className="dest-card-arrow" size={20} />
        </div>
        <p className="dest-card-price">From ₹{destination.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
