import { useEffect, useState } from 'react';
import { getApplications } from '../services/applicationService';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplications({ mine: 'true' });
        setApplications(data);
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="applications-page">
      <h1>My Applications</h1>
      {message && <div className="error-box">{message}</div>}
      <div className="applications-grid">
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map((application) => (
            <article key={application._id} className="application-card">
              <h2>{application.jobId?.title}</h2>
              <p>{application.jobId?.company}</p>
              <p>Status: <strong>{application.status}</strong></p>
              <p>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default MyApplications;
