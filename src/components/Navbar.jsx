import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Icon } from './Icons'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN');
  const navigate = useNavigate();

  // Re-evaluate token and user on render
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const changeLanguage = (langCode, langLabel) => {
    setCurrentLang(langLabel);
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };
  
  return (
    <>
      {/* Top Disclaimer Bar */}
      <div className="top-bar" style={{ background: '#0f3f20', color: 'white', fontSize: '12px', textAlign: 'center', padding: '8px 15px', fontWeight: 600 }}>
        <span>📄 Disclaimer: Please read AgriPay's official disclaimer before applying for loans.</span>
      </div>

      <header className="navbar new-navbar" style={{ top: 0, position: 'sticky', zIndex: 100 }}>
        <div className="nav-inner container" style={{ height: '78px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <span className="brand-mark"><Icon name="leaf" size={22}/></span>
            <span>Agri<span style={{ color: '#6c8f39' }}>Pay</span></span>
          </Link>
          
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            
            <NavLink to="/" onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>About Us</NavLink>
            
            {/* Products Dropdown */}
            <div className="nav-dropdown">
              <span className="dropdown-trigger" onClick={() => window.location.href='/products'}>
                Products <Icon name="arrow" size={10} style={{ transform: 'rotate(90deg)' }} />
              </span>
              <div className="dropdown-menu" style={{ minWidth: '240px' }}>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item" style={{ borderBottom: '1px solid #f1f5f9', color: '#6c8f39' }}>View All Products</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Agri Checkout</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Farmer Credit (BNPL)</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Farmer Ledger (Khata)</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Agri Retailer Dashboard</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Equipment Financing</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Farm Intelligence</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Agri Analytics</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="dropdown-item">Marketplace</Link>
              </div>
            </div>
            
            {/* Farmer Dropdown */}
            <div className="nav-dropdown">
              <span className="dropdown-trigger">
                For Farmers <Icon name="arrow" size={10} style={{ transform: 'rotate(90deg)' }} />
              </span>
              <div className="dropdown-menu">
                <Link to="/farmer" onClick={() => setOpen(false)} className="dropdown-item">Farmer Portal</Link>
                <Link to="/apply-loan" onClick={() => setOpen(false)} className="dropdown-item" style={{ color: '#16a34a', fontWeight: 'bold' }}>Apply for Loan</Link>
                <Link to="/loans" onClick={() => setOpen(false)} className="dropdown-item">Credit Limit</Link>
                <Link to="/kyc" onClick={() => setOpen(false)} className="dropdown-item">KYC Verification</Link>
                <Link to="/agri-score" onClick={() => setOpen(false)} className="dropdown-item">Agri Credit Score</Link>
                <Link to="/emi-calculator" onClick={() => setOpen(false)} className="dropdown-item">EMI Calculator</Link>
                <Link to="/schemes" onClick={() => setOpen(false)} className="dropdown-item">Govt. Schemes</Link>
              </div>
            </div>

            <NavLink to="/merchant" onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>For Merchants</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
            <NavLink to="/feedback" onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Feedback</NavLink>

            {/* Language Selector - Always Visible */}
            <div className="nav-dropdown" style={{ marginLeft: '10px', marginRight: '5px' }}>
              <span className="dropdown-trigger" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Icon name="globe" size={16} /> {currentLang}
              </span>
              <div className="dropdown-menu" style={{ minWidth: '150px', left: 'auto', right: 0 }}>
                <div className="dropdown-item" style={{ fontWeight: 700, color: '#163a2a', borderBottom: '1px solid #f1f5f9', cursor: 'default' }}>Select Language</div>
                <div className="dropdown-item" onClick={() => changeLanguage('en', 'EN')}>English (EN)</div>
                <div className="dropdown-item" onClick={() => changeLanguage('hi', 'HI')}>हिंदी (Hindi)</div>
                <div className="dropdown-item" onClick={() => changeLanguage('mr', 'MR')}>मराठी (Marathi)</div>
                <div className="dropdown-item" onClick={() => changeLanguage('pa', 'PA')}>ਪੰਜਾਬੀ (Punjabi)</div>
                <div className="dropdown-item" onClick={() => changeLanguage('te', 'TE')}>తెలుగు (Telugu)</div>
              </div>
            </div>

            {token ? (
              <div className="nav-dropdown" style={{ marginLeft: '10px' }}>
                <div className="dropdown-trigger" style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: '#163a2a', cursor: 'pointer', border: '2px solid #d9f26a' }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="dropdown-menu" style={{ right: 0, left: 'auto', minWidth: '220px', padding: '10px 0' }}>
                  <div style={{ padding: '10px 20px', borderBottom: '1px solid #f1f5f9', marginBottom: '5px' }}>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#1e293b' }}>{user?.name || 'User'}</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{user?.email || 'Logged In'}</span>
                  </div>
                  {user && (
                  <Link to={user.role === 'merchant' ? "/merchant-dashboard" : "/dashboard"} onClick={() => setOpen(false)} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', padding: '10px 20px' }}>
                    <Icon name="chart" size={16} /> Dashboard Overview
                  </Link>
                )}  <Link to="/dashboard?tab=settings" onClick={() => setOpen(false)} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', padding: '10px 20px' }}>
                    <Icon name="receipt" size={16} /> Account Settings
                  </Link>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      setOpen(false);
                      navigate('/login');
                    }}
                    className="dropdown-item" 
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626', width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: '10px 20px' }}
                  >
                    <Icon name="close" size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="nav-auth-buttons" style={{ display: 'flex', gap: '10px', marginLeft: '10px', alignItems: 'center' }}>
                <Link to="/login" onClick={() => setOpen(false)} className="button button-sm button-ghost">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="button button-sm">Sign Up</Link>
              </div>
            )}
          </nav>
          
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <Icon name={open ? 'close' : 'menu'}/>
          </button>
        </div>
      </header>
    </>
  )
}
