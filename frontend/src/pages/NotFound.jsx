import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="notfound-page">
    <h1>404</h1>
    <p>Page not found.</p>
    <Link to="/jobs">Back to Jobs</Link>
  </section>
);

export default NotFound;
