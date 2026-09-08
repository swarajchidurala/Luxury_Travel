import ExperienceCard from '../components/ExperienceCard';
import { experiences } from '../data/experiences';
import { useToast } from '../context/ToastContext';
import './Experiences.css';

export default function Experiences() {
  const { showToast } = useToast();
  return (
    <div className="experiences-page animate-fade-in">
      <div className="page-header experiences-header-bg">
        <div className="page-header-bg">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=60&w=1600" alt="Wellness Retreat" loading="eager" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-header-content text-light">
          <span className="text-label text-light">Experiences</span>
          <h1 className="text-display">Travel deeper.</h1>
          <p className="text-body-large">Extraordinary experiences designed<br/>to stay with you forever.</p>
        </div>
      </div>

      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="text-h2">Choose your experience</h2>
          </div>
          <div className="exp-page-grid">
            {experiences.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-journey section bg-dark text-center">
        <div className="container">
          <h2 className="text-display manifesto">
            "Travel slowly. See deeply.<br/>Remember everything."
          </h2>
          <button 
            className="btn btn-primary btn-light mt-4"
            onClick={() => showToast("Let's start planning your next extraordinary experience.", "success")}
          >
            Plan Your Experience
          </button>
        </div>
      </section>
    </div>
  );
}
