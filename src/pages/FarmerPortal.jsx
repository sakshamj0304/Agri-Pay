import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';

export default function FarmerPortal() {
  return (
    <div className="page-container bg-light" style={{ minHeight: '80vh' }}>
      <div className="container py-5">
        <SectionHeader eyebrow="FARMER PORTAL" title="Grow with AgriPay" copy="Manage your loans, check EMI schedules, and access government schemes directly from your dedicated portal." />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: '#ecfdf5', borderRadius: '50%', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="receipt" size={32} />
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Apply for a Loan</h3>
            <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: 1.6 }}>Get instant digital credit up to ₹5,00,000 for purchasing seeds, fertilizers, and equipment.</p>
            <Link to="/apply-loan" className="button" style={{ width: '100%', justifyContent: 'center' }}>Apply Now</Link>
          </div>
          
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: '#fef3c7', borderRadius: '50%', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="clock" size={32} />
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Track EMIs</h3>
            <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: 1.6 }}>View your upcoming payments and use the EMI calculator to plan your finances effectively.</p>
            <Link to="/emi-calculator" className="button button-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid #cbd5e1' }}>Calculate EMI</Link>
          </div>

          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: '#eff6ff', borderRadius: '50%', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="chart" size={32} />
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>My Loans</h3>
            <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: 1.6 }}>Check the status of your applications, wallet balance, and full loan history.</p>
            <Link to="/dashboard" className="button button-ghost" style={{ width: '100%', justifyContent: 'center', border: '1px solid #cbd5e1' }}>View History</Link>
          </div>

          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: '#f1f5f9', borderRadius: '50%', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="shield" size={32} />
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Access Dashboard</h3>
            <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: 1.6 }}>Log in to view your complete profile, manage settings, and update your KYC documents.</p>
            <Link to="/login" className="button" style={{ width: '100%', justifyContent: 'center' }}>Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
