import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/authService';

const Login = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      loginUser(data);
      navigate('/jobs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        {error && <div className="error-box">{error}</div>}
        <button type="submit">Login</button>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
