import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';

export default function MerchantPortal() {
  return (
    <div className="page-container" style={{ background: '#163a2a', color: 'white', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container py-5">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
          <span className="eyebrow lime" style={{ color: '#d9f26a', marginBottom: '15px' }}>MERCHANT PORTAL</span>
          <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '20px' }}>Empower Your <span style={{ color: '#d9f26a' }}>Agri-Business</span></h2>
          <p style={{ fontSize: '18px', color: '#b9c7bf', lineHeight: 1.6 }}>Partner with AgriPay to provide instant credit to your farming customers. Boost your sales with zero default risk.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(217, 242, 106, 0.1)', borderRadius: '12px', color: '#d9f26a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="check" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Zero Credit Risk</h3>
            <p style={{ color: '#b9c7bf', lineHeight: 1.6 }}>We take on the risk. You get paid upfront when a farmer purchases from your store using AgriPay.</p>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(217, 242, 106, 0.1)', borderRadius: '12px', color: '#d9f26a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="chart" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Increase Sales</h3>
            <p style={{ color: '#b9c7bf', lineHeight: 1.6 }}>By offering easy credit options, farmers can purchase more equipment and supplies from your shop.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '50px', height: '50px', background: 'rgba(217, 242, 106, 0.1)', borderRadius: '12px', color: '#d9f26a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <Icon name="shield" size={24} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Easy Management</h3>
            <p style={{ color: '#b9c7bf', lineHeight: 1.6 }}>Track all farmer transactions, view your settlements, and manage inventory right from the dashboard.</p>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/register" className="button" style={{ background: '#d9f26a', color: '#163a2a', padding: '16px 32px', fontSize: '18px' }}>
            Register as a Merchant
          </Link>
          <div style={{ marginTop: '20px' }}>
            <Link to="/login" style={{ color: 'white', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px' }}>
              Already a partner? Login here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
