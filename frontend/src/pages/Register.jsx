import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { register } from '../services/authService';

const Register = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(form);
      loginUser(data);
      navigate('/jobs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        {error && <div className="error-box">{error}</div>}
        <button type="submit">Register</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
