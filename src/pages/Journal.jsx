import JournalCard from '../components/JournalCard';
import Newsletter from '../components/Newsletter';
import { journal } from '../data/journal';
import './Journal.css';

export default function Journal() {
  const featuredArticle = journal.find(article => article.featured);
  const otherArticles = journal.filter(article => !article.featured);

  return (
    <div className="journal-page animate-fade-in">
      <div className="page-header">
        <div className="page-header-bg">
          <img src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=2000" alt="Bali" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-header-content text-light">
          <span className="text-label text-light">Journal</span>
          <h1 className="text-display">Stories from<br/>a wider world.</h1>
          <p className="text-body-large">Inspiration, guides and perspectives<br/>for modern travelers.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-h2">Featured story</h2>
          </div>
          {featuredArticle && (
             <JournalCard article={featuredArticle} featured={true} />
          )}
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="text-h2">More stories</h2>
          </div>
          <div className="journal-page-grid">
            {otherArticles.map(article => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
