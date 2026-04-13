import { useState } from 'react';
import { postJob } from '../services/jobService';

const PostJob = () => {
  const [form, setForm] = useState({ title: '', company: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJob(form);
      setError('');
      setMessage('Job posted successfully');
      setForm({ title: '', company: '', description: '' });
    } catch (err) {
      setMessage('');
      setError(err.message);
    }
  };

  return (
    <section className="form-page">
      <h1>Post a New Job</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
        <label>Company</label>
        <input name="company" value={form.company} onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows="6" />
        {error && <div className="error-box">{error}</div>}
        {message && <div className="success-box">{message}</div>}
        <button type="submit">Publish Job</button>
      </form>
    </section>
  );
};

export default PostJob;
