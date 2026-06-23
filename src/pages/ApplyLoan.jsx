import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function ApplyLoan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [tenure, setTenure] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount), purpose, tenure: Number(tenure) })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to apply for loan');

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-container bg-light" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="check" size={40} />
            </div>
            <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Application Submitted!</h2>
            <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '0 auto 30px' }}>
            Your Credit Limit application has been successfully submitted. Our team is verifying your documents and will update you via SMS within 24 hours.
            </p>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
             <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Reference ID</strong>
             <span style={{ fontSize: '20px', color: '#163a2a', fontWeight: 800 }}>AGRI-LN-88429</span>
          </div>
          <Link to="/dashboard" className="button" style={{ width: '100%', justifyContent: 'center' }}>Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-light" style={{ minHeight: '100vh', padding: '60px 20px' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '10px' }}>CREDIT LIMIT</span>
          <h1 style={{ fontSize: '42px', color: '#163a2a' }}>Apply for Agri<span style={{ color: '#6c8f39' }}>Pay</span> Credit</h1>
          <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Complete this 3-step application to get instant approval for your agriculture credit needs.</p>
        </div>

        {/* Progress Tracker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: '#e2e8f0', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', top: '15px', left: '10%', width: step === 1 ? '0%' : step === 2 ? '40%' : '80%', height: '2px', background: '#6c8f39', zIndex: 2, transition: '0.4s' }}></div>
          
          {[
            { num: 1, label: 'Personal Details' },
            { num: 2, label: 'KYC & Docs' },
            { num: 3, label: 'Loan Details' }
          ].map((s) => (
            <div key={s.num} style={{ position: 'relative', zIndex: 3, textAlign: 'center', width: '100px' }}>
              <div style={{ width: '32px', height: '32px', margin: '0 auto 10px', background: step >= s.num ? '#6c8f39' : '#fff', border: step >= s.num ? '2px solid #6c8f39' : '2px solid #cbd5e1', color: step >= s.num ? 'white' : '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', transition: '0.3s' }}>
                {s.num}
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: step >= s.num ? '#163a2a' : '#94a3b8' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '50px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h2 style={{ fontSize: '24px', color: '#163a2a', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>Personal Information</h2>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Full Name (as per Aadhaar)</label>
                  <input type="text" required placeholder="Ramesh Singh" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Mobile Number</label>
                  <input type="tel" required placeholder="+91 9876543210" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Complete Address</label>
                <textarea required rows="3" placeholder="Village name, District, State, Pincode" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                <button type="submit" className="button">Next: KYC Verification <Icon name="arrow" size={16} /></button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext}>
              <h2 style={{ fontSize: '24px', color: '#163a2a', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>Government Documents</h2>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Aadhaar Number</label>
                <input type="text" required placeholder="XXXX-XXXX-XXXX" maxLength="14" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '18px', letterSpacing: '2px' }} />
              </div>
              
              <div style={{ marginBottom: '25px', padding: '20px', border: '1px dashed #94a3b8', borderRadius: '8px', background: '#f8fafc', textAlign: 'center' }}>
                <Icon name="receipt" size={24} style={{ color: '#64748b', marginBottom: '10px' }} />
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#163a2a', cursor: 'pointer' }}>
                  Upload Aadhaar Card (Front & Back)
                  <input type="file" required style={{ display: 'none' }} />
                </label>
                <span style={{ fontSize: '12px', color: '#64748b' }}>JPEG, PNG, or PDF up to 5MB</span>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>PAN Card Number</label>
                <input type="text" required placeholder="ABCDE1234F" maxLength="10" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                <button type="button" onClick={() => setStep(1)} className="button button-ghost" style={{ border: '1px solid #cbd5e1' }}>Back</button>
                <button type="submit" className="button">Next: Loan Details <Icon name="arrow" size={16} /></button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '24px', color: '#163a2a', marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>Loan Requirements</h2>
              
              {error && <div style={{ color: 'red', marginBottom: '15px', background: '#fee2e2', padding: '10px', borderRadius: '6px' }}>{error}</div>}
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Required Loan Amount</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '18px', fontWeight: 700, color: '#64748b' }}>₹</span>
                  <input type="number" required min="10000" max="500000" placeholder="50000" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 35px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '18px', fontWeight: 700 }} />
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Purpose of Loan</label>
                <select required value={purpose} onChange={(e) => setPurpose(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white' }}>
                  <option value="">Select a purpose</option>
                  <option value="seeds">Seeds & Fertilizers</option>
                  <option value="equipment">Farm Equipment (Tractor, Motor, etc.)</option>
                  <option value="irrigation">Irrigation Systems</option>
                  <option value="harvesting">Harvesting Labour</option>
                  <option value="other">Other Agricultural Need</option>
                </select>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Repayment Tenure</label>
                <select required value={tenure} onChange={(e) => setTenure(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white' }}>
                  <option value="">Select tenure</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="9">9 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                </select>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fef08a', padding: '15px', borderRadius: '8px', fontSize: '13px', color: '#92400e', marginBottom: '30px' }}>
                <Icon name="shield" size={14} style={{ marginRight: '5px' }} />
                By submitting this application, you authorize AgriPay to fetch your credit records and verify the submitted government documents for loan processing.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setStep(2)} className="button button-ghost" style={{ border: '1px solid #cbd5e1' }} disabled={loading}>Back</button>
                <button type="submit" className="button" style={{ background: '#059669', borderColor: '#059669' }} disabled={loading}>
                  {loading ? 'Submitting...' : <><Icon name="check" size={16} style={{ marginRight: '8px' }} /> Submit Application</>}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
