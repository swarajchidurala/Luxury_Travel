import { ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './JournalCard.css';

export default function JournalCard({ article, featured = false }) {
  const { showToast } = useToast();
  return (
    <article className={`journal-card ${featured ? 'featured' : ''}`}>
      <div className="journal-image-wrap">
        <img src={article.image} alt={article.title} className="journal-image" loading="lazy" />
      </div>
      <div className="journal-content">
        <div className="journal-meta">
          <span className="text-label">{article.category}</span>
          <span className="journal-dot">•</span>
          <span className="journal-time">{article.readTime}</span>
        </div>
        <h3 className="journal-title">{article.title}</h3>
        <p className="journal-excerpt">{article.excerpt}</p>
        <button 
          className="journal-link"
          onClick={() => showToast(`Reading: ${article.title}`)}
        >
          Read the story <ArrowRight size={16} className="journal-arrow" />
        </button>
      </div>
    </article>
  );
}
