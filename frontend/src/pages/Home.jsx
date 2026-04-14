import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import googleLogo from '../assets/logos/google.svg';
import microsoftLogo from '../assets/logos/microsoft.svg';
import infosysLogo from '../assets/logos/infosys.svg';
import tcsLogo from '../assets/logos/tcs.svg';
import flipkartLogo from '../assets/logos/flipkart.svg';
import swiggyLogo from '../assets/logos/swiggy.svg';
import zomatoLogo from '../assets/logos/zomato.svg';
import amazonLogo from '../assets/logos/amazon.svg';
import fallbackLogo from '../assets/logos/fallback.svg';

const topCompanies = [
  {
    name: 'Google',
    logo: googleLogo,
    background: 'radial-gradient(circle at top left, rgba(66, 133, 244, 0.35), transparent 28%), linear-gradient(160deg, #1f2937 0%, #111827 100%)',
    jobs: 245,
  },
  {
    name: 'Microsoft',
    logo: microsoftLogo,
    background: 'radial-gradient(circle at top right, rgba(0, 164, 239, 0.28), transparent 30%), linear-gradient(160deg, #111827 0%, #0f172a 100%)',
    jobs: 189,
  },
  {
    name: 'Infosys',
    logo: infosysLogo,
    background: 'radial-gradient(circle at 20% 20%, rgba(27, 122, 161, 0.24), transparent 28%), linear-gradient(160deg, #111827 0%, #0b1120 100%)',
    jobs: 156,
  },
  {
    name: 'TCS',
    logo: tcsLogo,
    background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.12), transparent 28%), linear-gradient(160deg, #111827 0%, #111827 100%)',
    jobs: 134,
  },
  {
    name: 'Flipkart',
    logo: flipkartLogo,
    background: 'radial-gradient(circle at 75% 20%, rgba(255, 229, 0, 0.25), transparent 28%), linear-gradient(160deg, #1f2937 0%, #111827 100%)',
    jobs: 98,
  },
  {
    name: 'Swiggy',
    logo: swiggyLogo,
    background: 'radial-gradient(circle at 80% 20%, rgba(251, 100, 27, 0.28), transparent 28%), linear-gradient(160deg, #111827 0%, #0f172a 100%)',
    jobs: 87,
  },
  {
    name: 'Zomato',
    logo: zomatoLogo,
    background: 'radial-gradient(circle at top right, rgba(234, 28, 45, 0.2), transparent 28%), linear-gradient(160deg, #111827 0%, #0b1120 100%)',
    jobs: 76,
  },
  {
    name: 'Amazon',
    logo: amazonLogo,
    background: 'radial-gradient(circle at top left, rgba(255, 153, 0, 0.25), transparent 28%), linear-gradient(160deg, #111827 0%, #111827 100%)',
    jobs: 203,
  },
];

const jobCategories = [
  { name: 'IT & Software', count: 1250, icon: '💻', bg: 'linear-gradient(135deg, #4f46e5, #2563eb)' },
  { name: 'Marketing', count: 890, icon: '📈', bg: 'linear-gradient(135deg, #ea580c, #f97316)' },
  { name: 'Finance', count: 675, icon: '💰', bg: 'linear-gradient(135deg, #047857, #10b981)' },
  { name: 'Operations', count: 543, icon: '⚙️', bg: 'linear-gradient(135deg, #0f766e, #14b8a6)' },
  { name: 'Sales', count: 432, icon: '📊', bg: 'linear-gradient(135deg, #9333ea, #ec4899)' },
  { name: 'HR', count: 321, icon: '👥', bg: 'linear-gradient(135deg, #1e293b, #334155)' },
  { name: 'Design', count: 298, icon: '🎨', bg: 'linear-gradient(135deg, #db2777, #f472b6)' },
  { name: 'Content Writing', count: 234, icon: '✍️', bg: 'linear-gradient(135deg, #475569, #64748b)' },
];

const featuredJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bangalore',
    salary: '₹25L - ₹45L',
    type: 'Full-time',
    logo: googleLogo,
    background: 'linear-gradient(180deg, rgba(66, 133, 244, 0.35), rgba(15, 23, 42, 0.9))',
    description: 'Lead cutting-edge projects and mentor junior engineers.',
  },
  {
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Hyderabad',
    salary: '₹20L - ₹35L',
    type: 'Full-time',
    logo: microsoftLogo,
    background: 'linear-gradient(180deg, rgba(0, 164, 239, 0.25), rgba(15, 23, 42, 0.9))',
    description: 'Drive product strategy and innovation across cross-functional teams.',
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Infosys',
    location: 'Pune',
    salary: '₹15K - ₹25K',
    type: 'Internship',
    logo: infosysLogo,
    background: 'linear-gradient(180deg, rgba(27, 122, 161, 0.28), rgba(15, 23, 42, 0.9))',
    description: 'Learn modern web technologies while building real products.',
  },
  {
    title: 'Data Scientist',
    company: 'TCS',
    location: 'Mumbai',
    salary: '₹18L - ₹28L',
    type: 'Full-time',
    logo: tcsLogo,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(15, 23, 42, 0.92))',
    description: 'Analyze complex datasets and build predictive models for business growth.',
  },
];

const platformFeatures = [
  {
    icon: '🎯',
    title: 'Smart Job Matching',
    description: 'Get personalized job recommendations based on your profile and preferences.',
    slug: 'matching'
  },
  {
    icon: '⚡',
    title: 'Quick Apply',
    description: 'Apply to multiple jobs with just one click using your saved profile.',
    slug: 'quick-apply'
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Access jobs and manage applications from anywhere on any device.',
    slug: 'mobile'
  },
  {
    icon: '🔔',
    title: 'Job Alerts',
    description: 'Get notified when new jobs matching your criteria are posted.',
    slug: 'alerts'
  },
  {
    icon: '📊',
    title: 'Application Tracking',
    description: 'Track all your applications and get updates on their status.',
    slug: 'tracking'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security measures.',
    slug: 'security'
  },
];

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || locationQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleFeaturedJobClick = (job) => {
    navigate(`/jobs?search=${encodeURIComponent(job.title)}&location=${encodeURIComponent(job.location)}`);
  };

  const handleCompanyClick = (companyName) => {
    navigate(`/jobs?search=${encodeURIComponent(companyName)}`);
  };

  const handleFeatureClick = (feature) => {
    // Store the feature in session storage for reference
    sessionStorage.setItem('selectedFeature', JSON.stringify(feature));
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section with Search */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p className="hero-subtitle">
            Discover opportunities from India's top companies. Your next career move starts here.
          </p>

          {/* Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-inputs">
              <div className="search-input-group">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="search-input-group">
                <span className="location-icon">📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="search-btn">
                Search Jobs
              </button>
            </div>
          </form>

          <div className="hero-stats">
            <div className="stat-item">
              <strong>50,000+</strong>
              <span>Active Jobs</span>
            </div>
            <div className="stat-item">
              <strong>10,000+</strong>
              <span>Companies</span>
            </div>
            <div className="stat-item">
              <strong>5,00,000+</strong>
              <span>Job Seekers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/jobs" className="action-card">
              <div className="action-icon">💼</div>
              <h3>Browse Jobs</h3>
              <p>Explore thousands of job opportunities</p>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="action-card">
                <div className="action-icon">📊</div>
                <h3>My Dashboard</h3>
                <p>Track your applications and profile</p>
              </Link>
            ) : (
              <Link to="/register" className="action-card">
                <div className="action-icon">📝</div>
                <h3>Create Profile</h3>
                <p>Get started with your job search</p>
              </Link>
            )}
            <Link to="/jobs?type=internship" className="action-card">
              <div className="action-icon">🎓</div>
              <h3>Internships</h3>
              <p>Find internship opportunities</p>
            </Link>
            <Link to="/jobs?experience=fresher" className="action-card">
              <div className="action-icon">🌟</div>
              <h3>Fresher Jobs</h3>
              <p>Entry-level positions for freshers</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs">
        <div className="container">
          <div className="section-header">
            <h2>Featured Jobs</h2>
            <Link to="/jobs" className="view-all">View All Jobs →</Link>
          </div>
          <div className="jobs-grid">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="job-card featured-job-card"
                onClick={() => handleFeaturedJobClick(job)}
                role="button"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && handleFeaturedJobClick(job)}
                style={{
                  background: job.background,
                }}
              >
                <div className="job-header">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="company-logo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackLogo;
                    }}
                  />
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                </div>
                <div className="job-tag">{job.type}</div>
                <div className="job-description">
                  <p>{job.description}</p>
                </div>
                <div className="job-details">
                  <span className="location">📍 {job.location}</span>
                  <span className="salary">💰 {job.salary}</span>
                </div>
                <div className="apply-btn-wrapper">
                  {isAuthenticated ? (
                    <button className="apply-btn" onClick={(e) => e.stopPropagation()}>
                      Apply Now
                    </button>
                  ) : (
                    <Link to="/register" className="apply-btn" onClick={(e) => e.stopPropagation()}>
                      Register to Apply
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="top-companies">
        <div className="container">
          <h2>Top Companies Hiring</h2>
          <div className="companies-grid">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                className="company-card clickable-card company-card-visual"
                onClick={() => handleCompanyClick(company.name)}
                role="button"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && handleCompanyClick(company.name)}
                title={`View ${company.name} jobs`}
                style={{
                  background: company.background,
                }}
              >
                <div className="company-card-top">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackLogo;
                    }}
                  />
                  <h3>{company.name}</h3>
                </div>
                <div className="company-card-meta">
                  <p className="jobs-count">{company.jobs} Jobs</p>
                  <div className="company-action">Browse Jobs →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="job-categories">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {jobCategories.map((category, index) => (
              <Link
                key={index}
                to={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="category-card category-card-gradient"
                style={{ background: category.bg }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.count} Jobs</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>
          <div className="features-grid">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-card clickable-feature"
                onClick={() => handleFeatureClick(feature)}
                role="button"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && handleFeatureClick(feature)}
                title="Click to learn more"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-action">Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>
              {isAuthenticated
                ? `Ready to take the next step, ${user?.name?.split(' ')[0]}?`
                : 'Ready to find your dream job?'
              }
            </h2>
            <p>
              {isAuthenticated
                ? 'Browse the latest opportunities and apply to jobs that match your skills.'
                : 'Join thousands of job seekers who found their perfect role through our platform.'
              }
            </p>
            <div className="cta-buttons">
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-secondary">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
