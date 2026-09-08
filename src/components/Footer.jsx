import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import './Footer.css';

export default function Footer() {
  const { showToast } = useToast();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">AURELIA</Link>
            <p className="footer-tagline">Curated journeys for curious travelers.</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <p>123 Luxury Lane, Suite 400</p>
              <p>New York, NY 10001</p>
              <p className="contact-item"><a href="mailto:hello@aureliatravel.com">hello@aureliatravel.com</a></p>
              <p className="contact-item"><a href="tel:+18005550199">+1 (800) 555-0199</a></p>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/experiences">Experiences</Link></li>
              <li><Link to="/journal">Journal</Link></li>
              <li>
                <button 
                  className="footer-btn-link"
                  onClick={() => showToast("Our full story is coming soon!")}
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Social</h4>
            <ul className="social-links">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 2.8 11 3 11c1 1 2 1 3 1-3-2-2-7-2-7 1 1.4 3 2.5 5 2.5-1-6 8-8 10-3 1.5-.5 3-1.5 3-1.5z"/></svg>
              </a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <button onClick={() => showToast("Privacy policy page coming soon!")}>Privacy</button>
            <button onClick={() => showToast("Terms of service page coming soon!")}>Terms</button>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} Aurelia Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
