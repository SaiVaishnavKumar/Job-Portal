import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="brand">
        <NavLink to="/">Job Portal</NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'active' : '')}>
              Jobs
            </NavLink>
            <NavLink to="/applications" className={({ isActive }) => (isActive ? 'active' : '')}>
              Applications
            </NavLink>
            {user?.role === 'employer' && (
              <NavLink to="/post-job" className={({ isActive }) => (isActive ? 'active' : '')}>
                Post Job
              </NavLink>
            )}
            {user?.role === 'employer' && (
              <NavLink to="/applicants" className={({ isActive }) => (isActive ? 'active' : '')}>
                Applicants
              </NavLink>
            )}
            <button className="btn-link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>
              Register
            </NavLink>
          </>
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
