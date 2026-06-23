import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Icon } from '../components/Icons';

export default function AgriScore() {
  const [landSize, setLandSize] = useState('');
  const [cropType, setCropType] = useState('wheat');
  const [income, setIncome] = useState('');
  const [pastDefault, setPastDefault] = useState('no');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateScore = (e) => {
    e.preventDefault();
    setLoading(true);
    setScore(null);
    setTimeout(() => {
      let baseScore = 400;
      if (Number(landSize) > 5) baseScore += 100;
      else if (Number(landSize) > 2) baseScore += 50;

      if (Number(income) > 500000) baseScore += 150;
      else if (Number(income) > 200000) baseScore += 80;

      if (pastDefault === 'no') baseScore += 150;
      else baseScore -= 100;

      if (['sugarcane', 'cotton', 'spices', 'orchard'].includes(cropType)) {
        baseScore += 50; // High yield/cash crops
      } else if (['veg', 'oilseeds', 'pulses'].includes(cropType)) {
        baseScore += 30; // Medium yield
      }

      // Ensure min 300, max 900
      let finalScore = Math.max(300, Math.min(900, baseScore));
      setScore(finalScore);
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score >= 750) return '#059669'; // Green
    if (score >= 600) return '#d97706'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreText = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 600) return 'Fair';
    return 'Needs Improvement';
  };

  const getLoanAmount = (score) => {
    if (score >= 750) return '₹5,00,000';
    if (score >= 600) return '₹2,50,000';
    if (score >= 400) return '₹50,000';
    return 'Not Eligible Yet';
  };

  return (
    <div className="page-container" style={{ background: '#fdfdfb', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container">
        <SectionHeader 
          eyebrow="SMART ELIGIBILITY" 
          title={<>Your <span className="accent">Agri Credit Score</span></>} 
          copy="Calculate your farming credit score based on your assets and history to instantly know your eligible loan amount."
          center 
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '40px auto' }}>
          
          {/* Input Form */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginBottom: '30px', color: '#1e293b', fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="receipt" size={20} /> Farmer Details
            </h3>
            <form onSubmit={calculateScore} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, color: '#64748b' }}>Land Size (Acres)</label>
                <input required type="number" min="0" step="0.1" value={landSize} onChange={e => setLandSize(e.target.value)} placeholder="e.g. 2.5" className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '16px' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, color: '#64748b' }}>Primary Crop Type</label>
                <select value={cropType} onChange={e => setCropType(e.target.value)} className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', appearance: 'none', background: '#f8fafc', fontSize: '16px' }}>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice / Paddy</option>
                  <option value="sugarcane">Sugarcane (Cash Crop)</option>
                  <option value="cotton">Cotton (Cash Crop)</option>
                  <option value="pulses">Pulses / Lentils (Daal)</option>
                  <option value="oilseeds">Oilseeds (Mustard, Soybean, Peanut)</option>
                  <option value="millets">Millets (Jowar, Bajra, Ragi)</option>
                  <option value="spices">Spices (Turmeric, Chilli, Coriander)</option>
                  <option value="veg">Vegetables</option>
                  <option value="orchard">Fruits / Orchard (Mango, Banana)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, color: '#64748b' }}>Annual Farming Income (₹)</label>
                <input required type="number" min="0" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 300000" className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '16px' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, color: '#64748b' }}>Any past default on loans?</label>
                <select value={pastDefault} onChange={e => setPastDefault(e.target.value)} className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '16px' }}>
                  <option value="no">No, never</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="button button-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '8px', fontSize: '16px', letterSpacing: '0.5px' }}>
                {loading ? 'Analyzing Profile...' : 'Calculate Score'}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: '0.4s', position: 'relative', overflow: 'hidden' }}>
            
            {/* Subtle top border color indicator */}
            {score && !loading && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: getScoreColor(score) }}></div>
            )}

            {!score && !loading && (
              <div style={{ color: '#94a3b8' }}>
                <Icon name="chart" size={50} style={{ opacity: 0.3, marginBottom: '20px' }} />
                <h3 style={{ fontSize: '20px', color: '#1e293b' }}>Result Pending</h3>
                <p style={{ fontSize: '14px', maxWidth: '250px', margin: '10px auto' }}>Fill out the form to instantly generate your personalized Agri Credit Score.</p>
              </div>
            )}

            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#059669', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: '#64748b', fontWeight: 500, fontSize: '14px' }}>Scanning agricultural records...</p>
              </div>
            )}

            {score && !loading && (
              <div className="score-reveal" style={{ animation: 'fadeInUp 0.6s ease', width: '100%' }}>
                
                {/* SVG Circular Progress with Glow */}
                <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 30px' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 10px ${getScoreColor(score)}40)` }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke={getScoreColor(score)} 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * ((score - 300) / 600))} 
                      style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0.7, 0.1, 1)' }} 
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '42px', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{score}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Out of 900</span>
                  </div>
                </div>

                <h2 style={{ fontSize: '26px', color: '#1e293b', marginBottom: '8px', fontWeight: 800 }}>
                  <span style={{ color: getScoreColor(score) }}>{getScoreText(score)}</span> Profile
                </h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px', maxWidth: '280px', margin: '0 auto 30px' }}>Based on your metrics, you are eligible for instant digital credit.</p>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'inline-block', width: '100%' }}>
                  <p style={{ margin: '0 0 4px', color: '#64748b', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Eligible Loan Amount</p>
                  <p style={{ margin: 0, color: '#1e293b', fontSize: '24px', fontWeight: 800 }}>{getLoanAmount(score)}</p>
                </div>

              </div>
            )}
            
          </div>
        </div>

      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .form-input:focus { outline: none; border-color: #059669; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
      `}</style>
    </div>
  );
}
