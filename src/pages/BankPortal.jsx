import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function BankPortal() {
  const [loanVolume, setLoanVolume] = useState(10000000); // 1 Crore default

  const interestReturn = loanVolume * 0.12; // 12% interest
  const npaSavings = loanVolume * 0.04; // 4% savings on NPA

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="page-container" style={{ background: '#0a192f', color: 'white', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container py-5">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <span className="eyebrow" style={{ color: '#64ffda', marginBottom: '15px', display: 'inline-block', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>INSTITUTIONAL PARTNERS</span>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '20px' }}>
            Empower Lending with <span style={{ color: '#64ffda' }}>AgriPay</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#8892b0', lineHeight: 1.6 }}>
            Join our network of Banks and NBFCs. Get access to verified farmers, pre-scored credit applications, and secure closed-loop disbursements.
          </p>
        </div>
        
        {/* Core Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="check" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Verified Farmer Data</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>Every farmer application comes with verified KYC, land records (Bhoomi), and historical yield data.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="chart" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Proprietary AgriScore</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>Our AI-driven AgriScore evaluates alternative data points like crop type, weather, and market prices.</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="shield" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Closed-Loop Lending</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>Funds are disbursed directly to our verified merchant network, ensuring zero fund diversion.</p>
          </div>
        </div>

        {/* 1. Live Analytics / NPA Dashboard */}
        <div style={{ background: '#112240', borderRadius: '24px', padding: '50px', marginBottom: '60px', border: '1px solid #233554', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '32px', color: '#e6f1ff', marginBottom: '20px' }}>Industry-Beating Default Rates</h3>
            <p style={{ color: '#8892b0', fontSize: '18px', lineHeight: 1.6 }}>By ensuring funds are used exclusively for agricultural inputs and tracking harvest cycles, AgriPay drastically reduces NPA (Non-Performing Assets) compared to traditional cash loans.</p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', gap: '20px' }}>
            <div style={{ background: '#0a192f', padding: '30px', borderRadius: '16px', borderTop: '4px solid #ef4444', flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>5.4%</div>
              <div style={{ color: '#8892b0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Industry Avg NPA</div>
            </div>
            <div style={{ background: '#0a192f', padding: '30px', borderRadius: '16px', borderTop: '4px solid #64ffda', flex: 1, textAlign: 'center', boxShadow: '0 10px 30px rgba(100,255,218,0.1)' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#64ffda', marginBottom: '10px' }}>0.2%</div>
              <div style={{ color: '#8892b0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>AgriPay NPA</div>
            </div>
          </div>
        </div>

        {/* 2. Process Flow-Chart */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', color: '#e6f1ff', marginBottom: '40px' }}>How Our Closed-Loop System Works</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(100, 255, 218, 0.05)', padding: '20px', borderRadius: '50%', width: '140px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #64ffda' }}>
              <span style={{ fontSize: '30px', marginBottom: '5px' }}>👨🏽‍🌾</span>
              <span style={{ color: '#e6f1ff', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>Farmer Applies</span>
            </div>
            <div style={{ color: '#8892b0' }}><Icon name="arrow" size={24} style={{ transform: 'rotate(-90deg)' }} /></div>
            <div style={{ background: 'rgba(100, 255, 218, 0.05)', padding: '20px', borderRadius: '50%', width: '140px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #64ffda' }}>
              <span style={{ fontSize: '30px', marginBottom: '5px' }}>🤖</span>
              <span style={{ color: '#e6f1ff', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>AgriScore Checked</span>
            </div>
            <div style={{ color: '#8892b0' }}><Icon name="arrow" size={24} style={{ transform: 'rotate(-90deg)' }} /></div>
            <div style={{ background: 'rgba(100, 255, 218, 0.05)', padding: '20px', borderRadius: '50%', width: '140px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #64ffda', boxShadow: '0 0 20px rgba(100,255,218,0.2)' }}>
              <span style={{ fontSize: '30px', marginBottom: '5px' }}>🏦</span>
              <span style={{ color: '#e6f1ff', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>Bank Approves</span>
            </div>
            <div style={{ color: '#8892b0' }}><Icon name="arrow" size={24} style={{ transform: 'rotate(-90deg)' }} /></div>
            <div style={{ background: 'rgba(100, 255, 218, 0.05)', padding: '20px', borderRadius: '50%', width: '140px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #64ffda' }}>
              <span style={{ fontSize: '30px', marginBottom: '5px' }}>🏪</span>
              <span style={{ color: '#e6f1ff', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>Funds to Merchant</span>
            </div>
          </div>
        </div>

        {/* 3. Interactive ROI Calculator */}
        <div style={{ background: '#112240', borderRadius: '24px', padding: '50px', marginBottom: '80px', border: '1px solid #233554' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', color: '#e6f1ff', marginBottom: '10px' }}>Calculate Your ROI</h3>
            <p style={{ color: '#8892b0' }}>Estimate your returns by deploying capital through AgriPay's secure ecosystem.</p>
          </div>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <label style={{ color: '#e6f1ff', fontWeight: 'bold' }}>Planned Loan Volume (Capital)</label>
                <span style={{ color: '#64ffda', fontWeight: 'bold', fontSize: '18px' }}>{formatCurrency(loanVolume)}</span>
              </div>
              <input 
                type="range" 
                min="1000000" 
                max="500000000" 
                step="1000000"
                value={loanVolume} 
                onChange={(e) => setLoanVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#64ffda', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8892b0', fontSize: '12px', marginTop: '10px' }}>
                <span>₹10 Lakh</span>
                <span>₹50 Crore</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#0a192f', padding: '20px', borderRadius: '12px', border: '1px solid rgba(100, 255, 218, 0.2)' }}>
                <div style={{ color: '#8892b0', fontSize: '14px', marginBottom: '5px' }}>Expected Yearly Return (12%)</div>
                <div style={{ color: '#e6f1ff', fontSize: '24px', fontWeight: 'bold' }}>{formatCurrency(interestReturn)}</div>
              </div>
              <div style={{ background: '#0a192f', padding: '20px', borderRadius: '12px', border: '1px solid rgba(100, 255, 218, 0.2)' }}>
                <div style={{ color: '#8892b0', fontSize: '14px', marginBottom: '5px' }}>Est. Savings on Defaults (4%)</div>
                <div style={{ color: '#64ffda', fontSize: '24px', fontWeight: 'bold' }}>{formatCurrency(npaSavings)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. API Integration Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h3 style={{ fontSize: '32px', color: '#e6f1ff', marginBottom: '20px' }}>Seamless CBS Integration</h3>
            <p style={{ color: '#8892b0', fontSize: '18px', lineHeight: 1.6, marginBottom: '20px' }}>Connect your Core Banking System to AgriPay within days, not months. Our RESTful APIs provide webhooks for real-time application processing, disbursement triggers, and collection updates.</p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#e6f1ff' }}>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Icon name="check" size={16} color="#64ffda" /> 99.99% Uptime SLA</li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Icon name="check" size={16} color="#64ffda" /> Bank-grade AES-256 Encryption</li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><Icon name="check" size={16} color="#64ffda" /> ISO 27001 Certified Infrastructure</li>
            </ul>
          </div>
          <div style={{ background: '#0a192f', padding: '25px', borderRadius: '16px', border: '1px solid #233554', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#112240', padding: '10px 20px', fontSize: '12px', color: '#8892b0', borderBottom: '1px solid #233554', display: 'flex', gap: '10px' }}>
              <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%' }}></span>
              <span style={{ width: '10px', height: '10px', background: '#eab308', borderRadius: '50%' }}></span>
              <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%' }}></span>
              <span style={{ marginLeft: '10px' }}>POST /api/v1/disburse</span>
            </div>
            <pre style={{ margin: 0, marginTop: '30px', color: '#64ffda', fontSize: '13px', overflowX: 'auto', lineHeight: 1.5 }}>
              <code>
{`const axios = require('axios');

const response = await axios.post(
  'https://api.agripay.in/v1/disburse', 
  {
    application_id: "APP_98765",
    amount: 50000,
    merchant_vpa: "agrimart@sbi"
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_BANK_KEY'
    }
  }
);

console.log(response.data.status); 
// "SUCCESS: Funds locked to merchant"`}
              </code>
            </pre>
          </div>
        </div>

        {/* 5. Partnership Tiers */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h3 style={{ fontSize: '32px', color: '#e6f1ff', marginBottom: '10px' }}>Partnership Tiers</h3>
          <p style={{ color: '#8892b0', marginBottom: '50px' }}>Choose the engagement model that fits your bank's rural lending goals.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            
            <Link to="/contact" style={{ background: '#112240', padding: '40px', borderRadius: '16px', border: '1px solid #233554', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <h4 style={{ color: '#8892b0', fontSize: '20px', marginBottom: '10px' }}>Silver Partner</h4>
              <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '30px', minHeight: '40px' }}>Perfect for NBFCs starting rural expansion.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e6f1ff', fontSize: '14px', flex: 1 }}>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>100+ Verified Leads/Month</li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Basic AgriScore Access</li>
                <li style={{ padding: '10px 0' }}>Standard Support</li>
              </ul>
              <div style={{ marginTop: '30px', textAlign: 'center', padding: '10px', border: '1px solid #8892b0', color: '#8892b0', borderRadius: '8px', fontWeight: 'bold' }}>Choose Silver</div>
            </Link>

            <Link to="/contact" style={{ background: '#0a192f', padding: '40px', borderRadius: '16px', border: '2px solid #64ffda', position: 'relative', transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textDecoration: 'none', display: 'flex', flexDirection: 'column' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-15px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#64ffda', color: '#0a192f', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>RECOMMENDED</div>
              <h4 style={{ color: '#64ffda', fontSize: '24px', marginBottom: '10px' }}>Gold Partner</h4>
              <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '30px', minHeight: '40px' }}>For mid-sized Banks scaling their PSL portfolio.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e6f1ff', fontSize: '14px', flex: 1 }}>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Unlimited Verified Leads</li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Advanced AI Risk Modeling</li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Co-branding on App</li>
                <li style={{ padding: '10px 0' }}>Dedicated Account Manager</li>
              </ul>
              <div style={{ marginTop: '30px', textAlign: 'center', padding: '10px', background: '#64ffda', color: '#0a192f', borderRadius: '8px', fontWeight: 'bold' }}>Choose Gold</div>
            </Link>

            <Link to="/contact" style={{ background: '#112240', padding: '40px', borderRadius: '16px', border: '1px solid #233554', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <h4 style={{ color: '#e6f1ff', fontSize: '20px', marginBottom: '10px' }}>Platinum Partner</h4>
              <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '30px', minHeight: '40px' }}>For Top Tier Banks with national rural footprint.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e6f1ff', fontSize: '14px', flex: 1 }}>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Exclusive Lead Access</li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>Custom API & CBS Integration</li>
                <li style={{ padding: '10px 0', borderBottom: '1px solid #233554' }}>First Right of Refusal</li>
                <li style={{ padding: '10px 0' }}>24/7 Priority Tech Support</li>
              </ul>
              <div style={{ marginTop: '30px', textAlign: 'center', padding: '10px', border: '1px solid #e6f1ff', color: '#e6f1ff', borderRadius: '8px', fontWeight: 'bold' }}>Choose Platinum</div>
            </Link>

          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/contact" className="button" style={{ background: '#64ffda', color: '#0a192f', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>
            Contact Partnerships Team
          </Link>
          <div style={{ marginTop: '20px' }}>
            <span style={{ color: '#8892b0', fontSize: '14px' }}>
              Want to test the API? <Link to="/contact" style={{ color: '#64ffda', textDecoration: 'underline' }}>Request Sandbox Access</Link>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
