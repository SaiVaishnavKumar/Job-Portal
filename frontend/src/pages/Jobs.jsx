import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getJobs, postJob, deleteJob } from '../services/jobService';
import { applyForJob } from '../services/applicationService';

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [experience, setExperience] = useState(searchParams.get('experience') || '');

  const loadJobs = async () => {
    try {
      setLoading(true);
      const filters = {
        search: search || undefined,
        location: location || undefined,
        category: category || undefined,
        type: type || undefined,
        experience: experience || undefined,
      };
      const data = await getJobs(filters);
      setJobs(data);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [search, location, category, type, experience]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    if (type) params.set('type', type);
    if (experience) params.set('experience', experience);
    setSearchParams(params);
  };

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId);
      setMessage('Application submitted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setType('');
    setExperience('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <div>
          <h1>Find Your Dream Job</h1>
          <p>Discover opportunities from top companies across India</p>
        </div>
      </div>

      {/* Advanced Search and Filters */}
      <div className="search-filters-section">
        <form className="search-filters-form" onSubmit={handleSearch}>
          <div className="search-row">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="search-input-group">
              <span className="location-icon">📍</span>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">Search Jobs</button>
          </div>

          <div className="filters-row">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Design">Design</option>
              <option value="Content Writing">Content Writing</option>
            </select>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            <select value={experience} onChange={(e) => setExperience(e.target.value)}>
              <option value="">All Experience Levels</option>
              <option value="fresher">Fresher (0-1 year)</option>
              <option value="entry">Entry Level (1-3 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (5+ years)</option>
            </select>

            <button type="button" className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div className={`info-box ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Jobs Results */}
      <div className="jobs-results">
        <div className="results-header">
          <h2>{loading ? 'Loading jobs...' : `${jobs.length} Jobs Found`}</h2>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <div className="no-jobs-icon">🔍</div>
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <article key={job._id} className="job-card">
                <div className="job-header">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <div className="job-type-badge">{job.type || 'Full-time'}</div>
                </div>

                <div className="job-details">
                  <div className="job-meta">
                    <span className="location">📍 {job.location || 'Location not specified'}</span>
                    <span className="salary">💰 {job.salary || 'Salary not disclosed'}</span>
                    <span className="experience">👨‍💼 {job.experience || 'Experience not specified'}</span>
                  </div>

                  <div className="job-description">
                    <p>{job.description.length > 150
                      ? `${job.description.substring(0, 150)}...`
                      : job.description
                    }</p>
                  </div>

                  {job.skills && job.skills.length > 0 && (
                    <div className="job-skills">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="skill-more">+{job.skills.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="job-actions">
                  {user?.role !== 'employer' ? (
                    <button
                      className="apply-btn"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply Now
                    </button>
                  ) : (
                    <div className="employer-note">
                      Employers can manage applicants from the dashboard
                    </div>
                  )}
                  <button className="save-btn">💾 Save Job</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
