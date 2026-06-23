import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function BankPortal() {
  return (
    <div className="page-container" style={{ background: '#0a192f', color: 'white', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container py-5">
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <span className="eyebrow" style={{ color: '#64ffda', marginBottom: '15px', display: 'inline-block', fontWeight: 'bold', tracking: '2px', textTransform: 'uppercase' }}>INSTITUTIONAL PARTNERS</span>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '20px' }}>
            Empower Lending with <span style={{ color: '#64ffda' }}>AgriPay</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#8892b0', lineHeight: 1.6 }}>
            Join our network of Banks and NBFCs. Get access to verified farmers, pre-scored credit applications, and secure closed-loop disbursements.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="check" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Verified Farmer Data</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>
              Every farmer application comes with verified KYC, land records (Bhoomi), and historical yield data, significantly reducing your verification overhead.
            </p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="chart" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Proprietary AgriScore</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>
              Utilize our AI-driven AgriScore which evaluates alternative data points like crop type, weather patterns, and market prices to predict repayment capacity.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '12px', color: '#64ffda', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="shield" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#e6f1ff' }}>Closed-Loop Lending</h3>
            <p style={{ color: '#8892b0', lineHeight: 1.6 }}>
              Funds are disbursed directly to our verified merchant network for specific agricultural inputs, ensuring zero fund diversion and lower NPA risk.
            </p>
          </div>

        </div>

        {/* Loan Providing Options Section */}
        <div style={{ marginTop: '60px', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(100, 255, 218, 0.1)' }}>
          <h3 style={{ fontSize: '28px', marginBottom: '10px', color: '#e6f1ff', textAlign: 'center' }}>Loan Providing Options</h3>
          <p style={{ color: '#8892b0', textAlign: 'center', marginBottom: '40px', fontSize: '16px' }}>Offer a variety of agricultural credit products directly through AgriPay's verified farmer network.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '25px', background: '#0a192f', borderRadius: '12px', borderLeft: '4px solid #64ffda' }}>
              <h4 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '10px' }}>Short-Term Crop Loans (Input Credit)</h4>
              <p style={{ color: '#8892b0', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>Provide 3-6 month credit lines specifically for seeds, fertilizers, and pesticides. Repayment is aligned with the crop harvest cycle.</p>
            </div>
            <div style={{ padding: '25px', background: '#0a192f', borderRadius: '12px', borderLeft: '4px solid #64ffda' }}>
              <h4 style={{ color: '#e6f1ff', fontSize: '18px', marginBottom: '10px' }}>Post-Harvest Storage Financing</h4>
              <p style={{ color: '#8892b0', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>Finance farmers against their warehouse receipts so they don't have to distress-sell their harvest at low prices.</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 47, 0) 100%)', borderRadius: '16px', padding: '40px', marginTop: '60px', borderLeft: '4px solid #64ffda' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#e6f1ff' }}>Co-Lending Opportunities</h3>
          <p style={{ color: '#8892b0', lineHeight: 1.6, marginBottom: '30px', maxWidth: '800px' }}>
            AgriPay acts as a seamless bridge between your capital and India's vast agricultural sector. We handle the sourcing, underwriting, and collection, while you focus on scaling your agricultural portfolio to meet PSL (Priority Sector Lending) targets efficiently.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8892b0' }}>
              <Icon name="check" size={16} color="#64ffda" /> <span>API Integration</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8892b0' }}>
              <Icon name="check" size={16} color="#64ffda" /> <span>Custom Risk Parameters</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8892b0' }}>
              <Icon name="check" size={16} color="#64ffda" /> <span>Real-time Dashboard</span>
            </div>
          </div>
        </div>

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
