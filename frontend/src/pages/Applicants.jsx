import { useEffect, useState } from 'react';
import { getApplications, updateApplicationStatus } from '../services/applicationService';

const Applicants = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleChangeStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      await loadApplications();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="applications-page">
      <h1>Application Reviews</h1>
      {error && <div className="error-box">{error}</div>}
      <div className="applications-grid">
        {applications.length === 0 ? (
          <p>No applications have been submitted to your jobs yet.</p>
        ) : (
          applications.map((application) => (
            <article key={application._id} className="application-card">
              <h2>{application.jobId?.title}</h2>
              <p>Company: {application.jobId?.company}</p>
              <p>Applicant: {application.applicantId?.name} ({application.applicantId?.email})</p>
              <p>Status: <strong>{application.status}</strong></p>
              <div className="status-actions">
                <button onClick={() => handleChangeStatus(application._id, 'reviewed')}>Review</button>
                <button onClick={() => handleChangeStatus(application._id, 'accepted')}>Accept</button>
                <button onClick={() => handleChangeStatus(application._id, 'rejected')}>Reject</button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Applicants;
