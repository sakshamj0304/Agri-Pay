import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function Login() {
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please make sure the Node.js backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-split-page" style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Visual Side */}
      <div className="login-visual" style={{ 
        flex: 1, 
        backgroundImage: 'linear-gradient(rgba(22, 58, 42, 0.4), rgba(22, 58, 42, 0.8)), url("https://images.unsplash.com/photo-1592982537447-6f2c6e1e8fa8?auto=format&fit=crop&w=1200&q=80")',
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
            <span>Agri<span style={{ color: '#d9f26a' }}>Pay</span></span>
          </Link>
        </div>
        
        <div style={{ maxWidth: '450px' }}>
          <h1 style={{ fontSize: '42px', lineHeight: 1.1, marginBottom: '20px', color: 'white' }}>Empowering the hands that feed the nation.</h1>
          <p style={{ fontSize: '18px', color: '#dcecd5', marginBottom: '30px' }}>Access your merchant or farmer account to track loans, manage KYC, and check EMIs.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', backdropFilter: 'blur(10px)' }}>
              <Icon name="shield" size={16} /> Secure
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', backdropFilter: 'blur(10px)' }}>
              <Icon name="check" size={16} /> Fast KYC
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="login-form-side" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 8%',
        background: '#fffdf8'
      }}>
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '10px' }}>WELCOME BACK</span>
          <h2 style={{ fontSize: '36px', marginBottom: '10px', color: '#163a2a' }}>Login to Account</h2>
          <p style={{ color: '#68766f', marginBottom: '30px' }}>Please enter your credentials to access your dashboard.</p>

          {error && (
            <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', color: '#991b1b', padding: '12px 16px', borderRadius: '4px', marginBottom: '25px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#163a2a', margin: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '13px', color: '#69843c', fontWeight: 600 }}>Forgot password?</Link>
              </div>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="Enter your password"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
              <input type="checkbox" id="remember" style={{ width: 'auto', margin: 0 }} />
              <label htmlFor="remember" style={{ margin: 0, fontSize: '14px', color: '#68766f', fontWeight: 'normal' }}>Remember me</label>
            </div>

            <button className="button" type="submit" disabled={isLoading} style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', justifyContent: 'center' }}>
              {isLoading ? 'Signing in...' : <>Sign in <Icon name="arrow" size={18}/></>}
            </button>
            
            <div style={{ position: 'relative', textAlign: 'center', margin: '35px 0' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '1px solid #dfe4dd', zIndex: 1 }}></div>
              <span style={{ position: 'relative', zIndex: 2, background: '#fffdf8', padding: '0 15px', color: '#68766f', fontSize: '13px', fontWeight: 600 }}>OR</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#68766f', fontSize: '15px' }}>
                Don't have an account? <Link to="/register" style={{ color: '#163a2a', fontWeight: 700, borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>Create one now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
