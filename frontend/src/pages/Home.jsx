import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Trusted job marketplace</p>
          <h1>Build your career, grow your company.</h1>
          <p className="hero-text">
            Job Portal helps candidates find meaningful work and employers hire fast with organized listings,
            powerful filters, and applicant tracking.
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
        <div className="hero-card">
          <div className="hero-card-header">
            <span>Fast matching</span>
            <strong>Find top roles and quality applicants in minutes.</strong>
          </div>
          <div className="hero-card-body">
            <div className="stat">
              <span>Search by title</span>
              <strong>1000+</strong>
            </div>
            <div className="stat">
              <span>Company filters</span>
              <strong>50+</strong>
            </div>
            <div className="stat">
              <span>Trusted by teams</span>
              <strong>200+</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h2>Search & apply with confidence</h2>
          <p>Discover jobs with rich descriptions, company details, and easy one-click applications.</p>
        </article>
        <article className="feature-card">
          <h2>Employer hiring dashboard</h2>
          <p>Post jobs, review applicants, and update application status from one clean dashboard.</p>
        </article>
        <article className="feature-card">
          <h2>Secure user accounts</h2>
          <p>Sign up as a job seeker or employer and keep your profile and activity safe.</p>
        </article>
      </div>

      <div className="how-it-works">
        <div>
          <h2>How it works</h2>
          <p>Start hiring or apply faster with workflows built for busy teams and career changers.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <strong>1. Create an account</strong>
            <p>Choose job seeker or employer, then complete your profile with one account.</p>
          </div>
          <div className="step-card">
            <strong>2. Find the right match</strong>
            <p>Use smart search and company filters to narrow searches instantly.</p>
          </div>
          <div className="step-card">
            <strong>3. Track applications</strong>
            <p>Manage applications, review status updates, and keep the hiring process moving.</p>
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
