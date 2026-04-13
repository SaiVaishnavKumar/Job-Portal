import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const topCompanies = [
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com', jobs: 245 },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', jobs: 189 },
  { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com', jobs: 156 },
  { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com', jobs: 134 },
  { name: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com', jobs: 98 },
  { name: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com', jobs: 87 },
  { name: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com', jobs: 76 },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', jobs: 203 },
];

const jobCategories = [
  { name: 'IT & Software', count: 1250, icon: '💻' },
  { name: 'Marketing', count: 890, icon: '📈' },
  { name: 'Finance', count: 675, icon: '💰' },
  { name: 'Operations', count: 543, icon: '⚙️' },
  { name: 'Sales', count: 432, icon: '📊' },
  { name: 'HR', count: 321, icon: '👥' },
  { name: 'Design', count: 298, icon: '🎨' },
  { name: 'Content Writing', count: 234, icon: '✍️' },
];

const featuredJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bangalore',
    salary: '₹25L - ₹45L',
    type: 'Full-time',
    logo: 'https://logo.clearbit.com/google.com'
  },
  {
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Hyderabad',
    salary: '₹20L - ₹35L',
    type: 'Full-time',
    logo: 'https://logo.clearbit.com/microsoft.com'
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Infosys',
    location: 'Pune',
    salary: '₹15K - ₹25K',
    type: 'Internship',
    logo: 'https://logo.clearbit.com/infosys.com'
  },
  {
    title: 'Data Scientist',
    company: 'TCS',
    location: 'Mumbai',
    salary: '₹18L - ₹28L',
    type: 'Full-time',
    logo: 'https://logo.clearbit.com/tcs.com'
  },
];

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery || locationQuery) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`);
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
                />
              </div>
              <div className="search-input-group">
                <span className="location-icon">📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
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
              <div key={index} className="job-card">
                <div className="job-header">
                  <img src={job.logo} alt={job.company} className="company-logo" />
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                </div>
                <div className="job-details">
                  <span className="location">📍 {job.location}</span>
                  <span className="salary">💰 {job.salary}</span>
                  <span className="type">{job.type}</span>
                </div>
                <Link to="/jobs" className="apply-btn">Apply Now</Link>
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
              <div key={index} className="company-card">
                <img src={company.logo} alt={company.name} className="company-logo" />
                <h3>{company.name}</h3>
                <p>{company.jobs} Jobs</p>
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
                className="category-card"
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
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Job Matching</h3>
              <p>Get personalized job recommendations based on your profile and preferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with just one click using your saved profile.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access jobs and manage applications from anywhere on any device.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Job Alerts</h3>
              <p>Get notified when new jobs matching your criteria are posted.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Application Tracking</h3>
              <p>Track all your applications and get updates on their status.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with enterprise-grade security measures.</p>
            </div>
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
