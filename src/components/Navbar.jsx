import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Search } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isScrolled && isHome ? 'transparent' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            AURELIA
          </Link>

          <div className="navbar-links desktop-only">
            <Link to="/destinations" className="nav-link">Destinations</Link>
            <Link to="/experiences" className="nav-link">Experiences</Link>
            <Link to="/journal" className="nav-link">Journal</Link>
            <Link to="/" className="nav-link">About</Link>
          </div>

          <div className="navbar-actions desktop-only">
            <Link to="/destinations" className="nav-icon" aria-label="Search">
              <Search size={20} />
            </Link>
            <Link to="/destinations" className="nav-icon" aria-label="Favorites">
              <Heart size={20} fill={favorites.length > 0 ? 'currentColor' : 'none'} />
              {favorites.length > 0 && <span className="favorites-badge">{favorites.length}</span>}
            </Link>
            <Link to="/destinations" className="btn btn-secondary nav-btn">Explore</Link>
          </div>

          <button 
            className="mobile-menu-toggle mobile-only"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-logo">AURELIA</Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-close-btn"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobile-menu-content">
          <Link to="/destinations" className="mobile-nav-link text-display">Destinations</Link>
          <Link to="/experiences" className="mobile-nav-link text-display">Experiences</Link>
          <Link to="/journal" className="mobile-nav-link text-display">Journal</Link>
          <Link to="/" className="mobile-nav-link text-display">About</Link>
          <Link to="/destinations" className="mobile-nav-link text-display">Favorites ({favorites.length})</Link>
        </div>
      </div>
    </>
  );
}
