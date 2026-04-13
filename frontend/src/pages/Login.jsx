import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/authService';

const Login = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(form);
      loginUser(data);
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="form-panel">
        <h1>Sign in to your account</h1>
        <p className="subtitle">Access job listings, apply instantly, and manage your applications.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          {error && <div className="error-box">{error}</div>}
          <button type="submit" disabled={loading} className="button button-primary">
            {loading ? 'Signing in...' : 'Login'}
          </button>
          <p className="account-copy">
            New to Job Portal? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
