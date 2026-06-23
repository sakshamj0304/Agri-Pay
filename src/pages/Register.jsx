import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', referredBy: '' });
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: role,
          referredBy: formData.referredBy
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please make sure the Node.js backend is running.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-page">
      <div className="container" style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="form-wrap">
          <h2 style={{ fontSize: '36px', marginBottom: '10px', color: '#163a2a' }}>Create your Account</h2>
          <p style={{ color: '#68766f', marginBottom: '30px' }}>Select your role and enter your details to get started.</p>

          {error && (
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#991b1b', padding: '12px 16px', borderRadius: '4px', marginBottom: '25px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form className="contact-form" onSubmit={handleRegister}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>I am a:</label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', border: role === 'farmer' ? '2px solid #16a34a' : '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', background: role === 'farmer' ? '#f0fdf4' : 'white', fontWeight: 600, color: role === 'farmer' ? '#166534' : '#64748b', transition: 'all 0.2s ease', boxShadow: role === 'farmer' ? '0 4px 12px rgba(22, 163, 74, 0.1)' : 'none' }}>
                  <input type="radio" name="role" value="farmer" checked={role === 'farmer'} onChange={() => setRole('farmer')} style={{ display: 'none' }} />
                  {role === 'farmer' && <span style={{ marginRight: '8px', display: 'flex' }}><Icon name="check" size={16} /></span>}
                  I am a Farmer
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', border: role === 'merchant' ? '2px solid #16a34a' : '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', background: role === 'merchant' ? '#f0fdf4' : 'white', fontWeight: 600, color: role === 'merchant' ? '#166534' : '#64748b', transition: 'all 0.2s ease', boxShadow: role === 'merchant' ? '0 4px 12px rgba(22, 163, 74, 0.1)' : 'none' }}>
                  <input type="radio" name="role" value="merchant" checked={role === 'merchant'} onChange={() => setRole('merchant')} style={{ display: 'none' }} />
                  {role === 'merchant' && <span style={{ marginRight: '8px', display: 'flex' }}><Icon name="check" size={16} /></span>}
                  I am a Merchant
                </label>
              </div>
            </div>
            <label>
              Business/Owner Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <div className="form-row">
              <label>
                Email Address
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Phone Number
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Password
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </label>
              <label>
                Referral Code (Optional)
                <input type="text" name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="e.g., SAKSH5123" />
              </label>
            </div>
            <button className="button" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              Create Account <Icon name="arrow" size={18}/>
            </button>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p>Already have an account? <Link to="/login" className="text-link">Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
