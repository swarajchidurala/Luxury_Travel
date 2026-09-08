import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import ExperienceCard from '../components/ExperienceCard';
import JournalCard from '../components/JournalCard';
import Newsletter from '../components/Newsletter';
import { destinations } from '../data/destinations';
import { experiences } from '../data/experiences';
import { journal } from '../data/journal';
import { useToast } from '../context/ToastContext';
import { useInView } from '../hooks/useInView';
import './Home.css';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=60&w=1600"
];

export default function Home() {
  const { showToast } = useToast();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // Scroll animation hooks
  const { ref: introRef, isInView: isIntroInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: destRef, isInView: isDestInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: expRef, isInView: isExpInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: journeyRef, isInView: isJourneyInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: whyRef, isInView: isWhyInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: journalRef, isInView: isJournalInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const { ref: testRef, isInView: isTestInView } = useInView({ threshold: 0.15, triggerOnce: false });

  const featuredDestinations = destinations.slice(0, 4);
  const featuredExperiences = experiences.slice(0, 3);
  const recentJournal = journal.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to section helper
  const scrollToContent = () => {
    const introSection = document.getElementById('intro');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          {HERO_IMAGES.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt="Luxury Travel Destination" 
              className={`hero-img ${idx === currentHeroImage ? 'active' : ''}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <span className="text-label text-light">Curated Journeys</span>
          <h1 className="text-display text-light hero-title">Discover places<br/>worth remembering.</h1>
          <p className="text-body-large text-light hero-desc">
            Private escapes, extraordinary stays, and journeys designed around the way you want to travel.
          </p>
          <div className="hero-actions">
            <Link to="/destinations" className="btn btn-primary">Explore Destinations</Link>
            <Link to="/experiences" className="btn btn-secondary text-light hero-btn-outline">Discover Experiences</Link>
          </div>
        </div>
        <button className="scroll-indicator" onClick={scrollToContent} aria-label="Scroll down">
          <span className="text-label text-light">Scroll to explore</span>
          <ChevronDown className="text-light" size={20} />
        </button>
      </section>

      {/* Introduction */}
      <section id="intro" className={`intro section scroll-anim-section ${isIntroInView ? 'is-visible' : ''}`} ref={introRef}>
        <div className="container intro-grid">
          <div className="intro-text fade-in-up">
            <span className="text-label">The Aurelia Way</span>
            <h2 className="text-h2">"The best journeys aren't measured in miles."</h2>
            <p className="text-body-large">
              We curate meaningful escapes for travelers who want more than a destination. From secluded islands to hidden mountain villages, every journey is designed around discovery, comfort and connection.
            </p>
            <button 
              className="link-with-arrow"
              onClick={() => showToast("Our full story is coming soon!", "info")}
            >
              Learn more <ArrowRight size={16} />
            </button>
          </div>
          <div className="intro-image-wrap slide-up-img">
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800" alt="Serene view" className="intro-img" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className={`featured-dests section bg-alt scroll-anim-section ${isDestInView ? 'is-visible' : ''}`} ref={destRef}>
        <div className="container">
          <div className="section-header fade-in-up">
            <div>
              <h2 className="text-h2">Featured Destinations</h2>
            </div>
            <Link to="/destinations" className="link-with-arrow">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="dest-grid fade-in-up delay-1">
            {featuredDestinations.map(dest => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onClick={setSelectedDestination} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className={`experiences section scroll-anim-section ${isExpInView ? 'is-visible' : ''}`} ref={expRef}>
        <div className="container">
          <div className="experiences-header fade-in-up">
            <span className="text-label">Travel your way</span>
            <h2 className="text-h2">Extraordinary experiences<br/>for curious travelers.</h2>
          </div>
          <div className="exp-grid fade-in-up delay-1">
            {featuredExperiences.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
          <div className="center-actions">
             <Link to="/experiences" className="btn btn-secondary">Explore All Experiences</Link>
          </div>
        </div>
      </section>

      {/* Featured Journey */}
      <section className={`featured-journey section bg-dark scroll-anim-section ${isJourneyInView ? 'is-visible' : ''}`} ref={journeyRef}>
        <div className="container journey-grid">
          <div className="journey-image-wrap slide-up-img">
            <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1200" alt="Aegean Sea" className="journey-img" loading="lazy" />
          </div>
          <div className="journey-content text-light fade-in-up delay-1">
            <span className="text-label">Featured Journey</span>
            <h2 className="text-h2">Seven days in the Aegean</h2>
            <p className="text-body-large">
              Wake to the sound of the sea, move between quiet islands, and end each day somewhere beautiful.
            </p>
            <div className="journey-details">
              <div className="j-detail"><span>Duration</span><strong>12 Days</strong></div>
              <div className="j-detail"><span>Type</span><strong>Private</strong></div>
              <div className="j-detail"><span>Price</span><strong>From ₹4,890</strong></div>
            </div>
            <Link to="/destinations" className="btn btn-primary btn-light">View Journey <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* Why Aurelia */}
      <section className={`why-aurelia section scroll-anim-section ${isWhyInView ? 'is-visible' : ''}`} ref={whyRef}>
        <div className="container text-center">
          <h2 className="text-h2 manifesto fade-in-up">
            "Travel slowly.<br/>See deeply.<br/>Remember everything."
          </h2>
          <div className="features-grid fade-in-up delay-1">
            <div className="feature-item">
              <span className="feature-num">01</span>
              <h4>Thoughtfully curated</h4>
            </div>
            <div className="feature-item">
              <span className="feature-num">02</span>
              <h4>Privately designed</h4>
            </div>
            <div className="feature-item">
              <span className="feature-num">03</span>
              <h4>Beautifully effortless</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className={`journal-preview section bg-alt scroll-anim-section ${isJournalInView ? 'is-visible' : ''}`} ref={journalRef}>
        <div className="container">
          <div className="section-header fade-in-up">
            <h2 className="text-h2">From the journal</h2>
            <Link to="/journal" className="link-with-arrow">
              Read more <ArrowRight size={16} />
            </Link>
          </div>
          <div className="journal-grid fade-in-up delay-1">
            {recentJournal.map(article => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`testimonial section scroll-anim-section ${isTestInView ? 'is-visible' : ''}`} ref={testRef}>
        <div className="container testimonial-container fade-in-up">
          <h2 className="text-h2 testimonial-quote">
            "Every detail felt effortless. We didn't just visit Greece — we experienced it."
          </h2>
          <div className="testimonial-author fade-in-up delay-1">
            <p className="author-name">— Sofia & Daniel</p>
            <p className="author-loc">London, UK</p>
          </div>
        </div>
      </section>

      <Newsletter />

      {selectedDestination && (
        <DestinationModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
    </div>
  );
}
