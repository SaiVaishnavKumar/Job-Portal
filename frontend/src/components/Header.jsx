import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="brand">
        <Link to="/">Job Portal</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/jobs">Jobs</Link>
            <Link to="/applications">My Applications</Link>
            {user?.role === 'employer' && <Link to="/post-job">Post Job</Link>}
            {user?.role === 'employer' && <Link to="/applicants">Applicants</Link>}
            <button className="btn-link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
