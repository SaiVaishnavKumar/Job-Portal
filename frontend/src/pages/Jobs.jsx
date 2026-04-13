import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getJobs, postJob, deleteJob } from '../services/jobService';
import { applyForJob } from '../services/applicationService';

const Jobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const loadJobs = async () => {
    try {
      const data = await getJobs({ search, company });
      setJobs(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    loadJobs();
  };

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId);
      setMessage('Application submitted successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="jobs-page">
      <div className="page-header">
        <div>
          <h1>Job Listings</h1>
          <p>Search, filter, and apply for jobs.</p>
        </div>
      </div>
      <form className="search-box" onSubmit={handleSearch}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title or description" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Filter by company" />
        <button type="submit">Search</button>
      </form>
      {message && <div className="info-box">{message}</div>}
      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <article key={job._id} className="job-card">
              <h2>{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p>{job.description}</p>
              <p className="job-meta">Posted by: {job.postedBy?.name || 'Unknown'}</p>
              {user.role !== 'employer' ? (
                <button onClick={() => handleApply(job._id)}>Apply</button>
              ) : (
                <span className="role-note">Employers can manage applicants from the Applicants page.</span>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Jobs;
