import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getJobs } from '../services/jobService';
import { getApplications } from '../services/applicationService';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        setError('');
        if (user?.role === 'employer') {
          const employerJobs = await getJobs({ postedBy: user._id });
          const employerApplications = await getApplications();
          setJobs(employerJobs);
          setApplications(employerApplications);
        } else {
          const allJobs = await getJobs();
          const myApplications = await getApplications({ mine: 'true' });
          setJobs(allJobs.slice(0, 6));
          setApplications(myApplications);
        }
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [user]);

  const pendingCount = applications.filter((app) => app.status === 'pending').length;
  const acceptedCount = applications.filter((app) => app.status === 'accepted').length;
  const reviewedCount = applications.filter((app) => app.status === 'reviewed').length;

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your hiring and application pipeline from one location.</p>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}
      {loading ? (
        <p>Loading dashboard data...</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>{user?.role === 'employer' ? 'Jobs posted' : 'Top jobs available'}</h3>
              <p>{user?.role === 'employer' ? jobs.length : `${jobs.length} curated opportunities`}</p>
            </div>
            <div className="dashboard-card">
              <h3>{user?.role === 'employer' ? 'Total applicants' : 'My applications'}</h3>
              <p>{applications.length}</p>
            </div>
            <div className="dashboard-card">
              <h3>Pending reviews</h3>
              <p>{pendingCount}</p>
            </div>
            <div className="dashboard-card">
              <h3>Accepted offers</h3>
              <p>{acceptedCount}</p>
            </div>
          </div>

          {user?.role === 'employer' ? (
            <div className="dashboard-section">
              <h2>Recent applicants</h2>
              <div className="dashboard-list">
                {applications.length === 0 ? (
                  <p>No applications yet. Post more roles and attract talent.</p>
                ) : (
                  applications.slice(0, 4).map((application) => (
                    <div key={application._id} className="dashboard-item">
                      <div>
                        <strong>{application.applicantId?.name}</strong>
                        <p>{application.applicantId?.email}</p>
                      </div>
                      <div>
                        <p>{application.jobId?.title}</p>
                        <p>{application.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="dashboard-section">
              <h2>Recommended job listings</h2>
              <div className="dashboard-list">
                {jobs.length === 0 ? (
                  <p>There are no jobs available right now. Check back soon.</p>
                ) : (
                  jobs.map((job) => (
                    <div key={job._id} className="dashboard-item">
                      <div>
                        <strong>{job.title}</strong>
                        <p>{job.company}</p>
                      </div>
                      <div>
                        <p>{job.description.substring(0, 80)}...</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
