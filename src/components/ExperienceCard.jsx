import { ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './ExperienceCard.css';

export default function ExperienceCard({ experience }) {
  const { showToast } = useToast();
  return (
    <div className="exp-card">
      <div className="exp-image-wrap">
        <img src={experience.image} alt={experience.title} className="exp-image" loading="lazy" />
      </div>
      <div className="exp-content">
        <h3 className="exp-title">{experience.title}</h3>
        <p className="exp-desc">{experience.description}</p>
        <div className="exp-footer">
          <ul className="exp-features">
            {experience.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <button 
            className="exp-btn" 
            aria-label="Explore experience"
            onClick={() => showToast(`Exploring ${experience.title} experiences...`)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
