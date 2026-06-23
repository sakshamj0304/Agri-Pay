import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        if (data.user?.role !== 'admin') {
           setError('Access Denied. You do not have admin privileges.');
           setIsLoading(false);
           return;
        }
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-split-page" style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="login-visual" style={{ 
        flex: 1, 
        backgroundImage: 'linear-gradient(rgba(22, 58, 42, 0.6), rgba(22, 58, 42, 0.9)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        color: 'white'
      }}>
        <div>
          <Link className="brand light" to="/" style={{ color: 'white' }}>
            <span className="brand-mark" style={{ background: '#d9f26a', color: '#163a2a' }}><Icon name="leaf" size={22}/></span>
            <span>Agri<span style={{ color: '#d9f26a' }}>Pay</span> Admin</span>
          </Link>
        </div>
        
        <div style={{ maxWidth: '450px' }}>
          <h1 style={{ fontSize: '42px', lineHeight: 1.1, marginBottom: '20px', color: 'white' }}>Admin Control Center.</h1>
          <p style={{ fontSize: '18px', color: '#dcecd5', marginBottom: '30px' }}>Manage users, view enquiries, and oversee the entire AgriPay platform from here.</p>
        </div>
      </div>

      <div className="login-form-side" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 8%', background: '#fffdf8' }}>
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '10px' }}>SECURE ACCESS</span>
          <h2 style={{ fontSize: '36px', marginBottom: '10px', color: '#163a2a' }}>Admin Login</h2>
          <p style={{ color: '#68766f', marginBottom: '30px' }}>Enter your credentials to access the secure dashboard.</p>
          
          {error && (
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#991b1b', padding: '12px 16px', borderRadius: '4px', marginBottom: '25px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>Admin Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }} />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }} />
            </div>

            <button className="button" type="submit" disabled={isLoading} style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', justifyContent: 'center' }}>
              {isLoading ? 'Signing in...' : <>Secure Login <Icon name="arrow" size={18}/></>}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ color: '#68766f', fontSize: '15px' }}>
                Need access? <Link to="/admin/register" style={{ color: '#163a2a', fontWeight: 700, borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>Register new admin</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
