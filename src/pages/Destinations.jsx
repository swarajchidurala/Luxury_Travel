import { useState } from 'react';
import { Search } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import { destinations } from '../data/destinations';
import { useToast } from '../context/ToastContext';
import './Destinations.css';

const CATEGORIES = ['All', 'Beach', 'Mountain', 'City', 'Desert'];

export default function Destinations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { showToast } = useToast();

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="destinations-page animate-fade-in">
      <div className="page-header">
        <div className="page-header-bg">
          <img src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=2000" alt="Amalfi Coast" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-header-content text-light">
          <span className="text-label text-light">Destinations</span>
          <h1 className="text-display">A more beautiful<br/>worth awaits.</h1>
          <p className="text-body-large">Handpicked places. Unforgettable moments.</p>
        </div>
      </div>

      <div className="section bg-alt filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="category-filters">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="results-info">
            <p className="text-label">{filteredDestinations.length} exceptional destinations</p>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="dest-grid">
              {filteredDestinations.map(dest => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  onClick={setSelectedDestination} 
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3 className="text-h3">No journeys found.</h3>
              <p className="text-body-large">Try adjusting your search or category filter.</p>
              <button 
                className="btn btn-secondary mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <section className="cta-section section text-center">
        <div className="container">
          <h2 className="text-h2">Not sure where to go?</h2>
          <p className="text-body-large cta-desc">Let us help you find your perfect journey.</p>
          <button 
            className="btn btn-primary"
            onClick={() => showToast("Thank you for your interest! A travel advisor will contact you shortly.", "success")}
          >
            Get in touch
          </button>
        </div>
      </section>

      {selectedDestination && (
        <DestinationModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
    </div>
  );
}
