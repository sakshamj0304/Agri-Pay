import { Link } from 'react-router-dom'

export default function RegisterFarmer() {
  return (
    <div className="page-container bg-light" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px', margin: '40px auto' }}>
        <div className="auth-card" style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Farmer Registration</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Join AgriPay and get instant access to credit.</p>
          
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group mb-3">
              <label>Full Name (As per Aadhaar)</label>
              <input type="text" className="form-control" placeholder="Enter your full name" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            
            <div className="form-group mb-3">
              <label>Mobile Number</label>
              <input type="tel" className="form-control" placeholder="10-digit mobile number" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            
            <div className="form-group mb-4">
              <label>Village / District</label>
              <input type="text" className="form-control" placeholder="Enter your location" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            
            <button className="button button-full" style={{ width: '100%' }}>Register via OTP</button>
          </form>
          
          <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            Already registered? <Link to="/login" style={{ color: '#059669', fontWeight: 'bold' }}>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
