import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & Password, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split-page" style={{ minHeight: '100vh', display: 'flex', background: '#fffdf8', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ maxWidth: '450px', width: '100%', background: 'white', padding: '50px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#163a2a' }}>
            <Icon name="shield" size={28} />
          </div>
          <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#163a2a' }}>Forgot Password</h2>
          <p style={{ color: '#64748b' }}>{step === 1 ? "No worries, we'll send you reset instructions." : step === 2 ? "Enter the OTP sent to your email." : "Your password has been reset!"}</p>
        </div>

        {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

        {step === 3 ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#dcfce7', color: '#166534', padding: '20px', borderRadius: '8px', marginBottom: '30px', fontWeight: 600 }}>
              Password reset successfully!
            </div>
            <Link to="/login" className="button" style={{ width: '100%', justifyContent: 'center' }}>
              Back to Login
            </Link>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleRequestOtp}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="Enter your registered email"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }}
              />
            </div>
            
            <button className="button" type="submit" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <Link to="/login" style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Back to log in
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>6-Digit OTP</label>
              <input 
                type="text" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                required 
                maxLength="6"
                placeholder="Enter OTP"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px', letterSpacing: '2px', textAlign: 'center' }}
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#163a2a', marginBottom: '8px' }}>New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
                placeholder="Enter new password"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: 'white', fontSize: '15px' }}
              />
            </div>
            
            <button className="button" type="submit" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Back to email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
