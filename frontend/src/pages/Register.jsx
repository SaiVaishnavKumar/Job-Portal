import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { register } from '../services/authService';

const Register = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await register(form);
      loginUser(data);
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="form-panel">
        <h1>Create your account</h1>
        <p className="subtitle">Start hiring or applying today with a tailored dashboard.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          <label>Email address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>Account type</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {error && <div className="error-box">{error}</div>}
          <button type="submit" disabled={loading} className="button button-primary">
            {loading ? 'Creating account...' : 'Register'}
          </button>
          <p className="account-copy">
            Already a member? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
