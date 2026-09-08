import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './DestinationModal.css';

export default function DestinationModal({ destination, onClose }) {
  const { showToast } = useToast();

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!destination) return null;

  return createPortal(
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="modal-image-wrap">
          <img src={destination.image} alt={destination.name} className="modal-image" />
        </div>
        
        <div className="modal-details">
          <span className="text-label">{destination.location}</span>
          <h2 className="text-h2 modal-title">{destination.name}</h2>
          
          <div className="modal-scroll-content">
            <p className="modal-desc">{destination.longDescription || destination.description}</p>
            
            {destination.highlights && (
              <div className="modal-highlights">
                <h4 className="text-h4">Journey Highlights</h4>
                <ul>
                  {destination.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">Starting from</span>
                <span className="meta-value">₹{destination.price.toLocaleString()}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Best time</span>
                <span className="meta-value">{destination.bestTime}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">{destination.duration}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="btn btn-primary modal-cta"
            onClick={() => showToast(`Starting your journey to ${destination.name}...`)}
          >
            Explore Journey
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
