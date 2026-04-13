import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const featuredEmployers = [
  { name: 'CyberTech Labs', logo: 'https://logo.clearbit.com/cybertechlabs.com' },
  { name: 'Elevate Systems', logo: 'https://logo.clearbit.com/elevatesystems.com' },
  { name: 'Neon Finance', logo: 'https://logo.clearbit.com/neonfinance.com' },
  { name: 'Quantum Media', logo: 'https://logo.clearbit.com/quantummedia.com' },
];

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Trusted job marketplace</p>
          <h1>Build your career, grow your company.</h1>
          <p className="hero-text">
            Job Portal connects talent with fast-growing teams through powerful search, trusted job listings, and
            clear hiring workflows.
          </p>
          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/jobs" className="button button-primary">
                Browse Jobs
              </Link>
            ) : (
              <>
                <Link to="/register" className="button button-primary">
                  Get Started
                </Link>
                <Link to="/login" className="button button-secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span>Fast matching</span>
              <strong>Find top roles and quality applicants in minutes.</strong>
            </div>
            <div className="hero-card-body">
              <div className="stat">
                <span>Active jobs</span>
                <strong>1.5K+</strong>
              </div>
              <div className="stat">
                <span>Top companies</span>
                <strong>230+</strong>
              </div>
              <div className="stat">
                <span>Trusted hirers</span>
                <strong>90%</strong>
              </div>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="illustration-card">
              <p className="illustration-label">Featured role</p>
              <h3>Senior Product Designer</h3>
              <p>Remote · Full-time · $110k–$135k</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trusted-section">
        <p className="eyebrow">Featured companies</p>
        <div className="trusted-grid">
          {featuredEmployers.map((company) => (
            <div key={company.name} className="trusted-logo-card">
              <img src={company.logo} alt={company.name} />
              <span>{company.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h2>Smart search</h2>
          <p>Search roles by title, company, or keyword, then filter by company and recent postings.</p>
        </article>
        <article className="feature-card">
          <h2>Employer tools</h2>
          <p>Post jobs quickly and manage applicants in a secure, organized workflow.</p>
        </article>
        <article className="feature-card">
          <h2>Secure profiles</h2>
          <p>Keep account information safe with token-based authentication and session persistence.</p>
        </article>
      </div>

      <div className="how-it-works">
        <div>
          <h2>How it works</h2>
          <p>Whether you are hiring or applying, the portal keeps your workflow clear and productive.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <strong>1. Create your account</strong>
            <p>Pick job seeker or employer, then get verified and ready in minutes.</p>
          </div>
          <div className="step-card">
            <strong>2. Explore curated roles</strong>
            <p>View job details, company notes, and hiring manager info at a glance.</p>
          </div>
          <div className="step-card">
            <strong>3. Track every application</strong>
            <p>See updates, review status changes, and keep your hiring pipeline moving.</p>
          </div>
        </div>
      </div>

      <div className="cta-banner">
        <div>
          <h2>{isAuthenticated ? `Welcome back, ${user?.name || 'talent'}!` : 'Make your next career move today.'}</h2>
          <p>One platform for jobs, employer tools, and applicant tracking.</p>
        </div>
        <Link to="/jobs" className="button button-primary">
          Explore Jobs
        </Link>
      </div>
    </section>
  );
};

export default Home;
