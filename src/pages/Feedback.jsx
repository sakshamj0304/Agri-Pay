import { useState } from 'react';
import { Icon } from '../components/Icons';

export default function Feedback() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Feedback' })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="page-container bg-light" style={{ minHeight: '80vh', padding: '60px 20px' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '10px' }}>WE VALUE YOUR OPINION</span>
          <h1 style={{ fontSize: '36px', color: '#163a2a' }}>Submit Feedback</h1>
          <p style={{ color: '#64748b' }}>Help us improve AgriPay. Let us know what you think!</p>
        </div>

        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon name="check" size={32} />
              </div>
              <h3 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '10px' }}>Thank you!</h3>
              <p style={{ color: '#64748b' }}>Your feedback has been successfully submitted.</p>
              <button onClick={() => setStatus('')} className="button mt-4">Submit Another Response</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Your Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: '#f8fafc' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: '#f8fafc' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: '#f8fafc' }}
                />
              </div>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Your Feedback</label>
                <textarea 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  required 
                  rows="5"
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #dfe4dd', borderRadius: '8px', background: '#f8fafc', resize: 'vertical' }}
                ></textarea>
              </div>
              {status === 'error' && (
                <div style={{ color: '#dc2626', marginBottom: '20px', fontSize: '14px' }}>
                  An error occurred while submitting your feedback. Please try again.
                </div>
              )}
              <button type="submit" className="button" style={{ width: '100%' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
