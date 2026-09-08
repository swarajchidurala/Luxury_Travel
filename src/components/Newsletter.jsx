import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      showToast("Thank you for joining Aurelia! You'll hear from us soon.", 'success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="newsletter section">
      <div className="container newsletter-container">
        <div className="newsletter-content">
          {status === 'success' ? (
            <div className="newsletter-success animate-fade-in">
              <h2 className="text-h2">Welcome to Aurelia.</h2>
              <p className="text-body-large">Thank you for subscribing. Your journey begins here.</p>
            </div>
          ) : (
            <>
              <h2 className="text-h2">Your next story starts here.</h2>
              <p className="text-body-large newsletter-desc">
                Receive occasional inspiration, hidden destinations and journeys worth taking.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(status === 'error') setStatus('idle');
                    }}
                    className={`newsletter-input ${status === 'error' ? 'error' : ''}`}
                    aria-label="Email address"
                  />
                  {status === 'error' && <span className="error-msg">Please enter a valid email.</span>}
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary newsletter-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Joining...' : 'Join Aurelia'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
