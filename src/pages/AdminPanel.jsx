import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [allUsers, setAllUsers] = useState([]);
  const [allEnquiries, setAllEnquiries] = useState([]);
  const [allLoans, setAllLoans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch users from backend
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAllUsers(prev => {
            // Merge to avoid duplicates if demo data overlaps
            const existingNames = new Set(prev.map(u => u.name));
            const newUsers = data.filter(u => !existingNames.has(u.name));
            return [...newUsers, ...prev];
          });
        }
      })
      .catch(err => console.error('Failed to fetch users:', err));

    // Fetch enquiries from backend
    fetch('/api/admin/contacts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAllEnquiries(prev => {
            const existingIds = new Set(prev.map(e => e._id || e.name));
            const newEnquiries = data.filter(e => !existingIds.has(e._id || e.name));
            return [...newEnquiries, ...prev];
          });
        }
      })
      .catch(err => console.error('Failed to fetch contacts:', err));

    // Fetch all loans
    fetch('/api/loans/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllLoans(data);
      })
      .catch(err => console.error('Failed to fetch loans:', err));
  }, [navigate]);

  const handleUpdateLoan = async (loanId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/loans/update-status/${loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAllLoans(prev => prev.map(loan => loan._id === loanId ? { ...loan, status: newStatus } : loan));
      } else {
        alert('Failed to update loan status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating loan');
    }
  };

  const handleUpdateKyc = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/users/${userId}/kyc`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAllUsers(prev => prev.map(user => user._id === userId ? { ...user, kycStatus: newStatus } : user));
      } else {
        alert('Failed to update KYC status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating KYC');
    }
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', height: '100vh', background: '#f4f6f8' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#163a2a', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 800, fontSize: '20px', letterSpacing: '-1px' }}>
            <span style={{ width: '32px', height: '32px', background: '#d9f26a', color: '#163a2a', borderRadius: '8px', display: 'grid', placeItems: 'center' }}>
              <Icon name="leaf" size={18}/>
            </span>
            <span>Agri<span style={{ color: '#d9f26a' }}>Pay</span> Admin</span>
          </Link>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'dashboard' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="chart" size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('farmers')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'farmers' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'farmers' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="users" size={18} /> Registered Farmers
          </button>
          <button 
            onClick={() => setActiveTab('merchants')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'merchants' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'merchants' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="store" size={18} /> Registered Merchants
          </button>
          <button 
            onClick={() => setActiveTab('loans')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'loans' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'loans' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="receipt" size={18} /> Credit Limits
          </button>
          <button 
            onClick={() => setActiveTab('kyc')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'kyc' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'kyc' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="shield" size={18} /> KYC Verification
          </button>
          <button 
            onClick={() => setActiveTab('emi')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'emi' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'emi' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="clock" size={18} /> EMI Tracking
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'reports' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'reports' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="check" size={18} /> Reports
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'enquiries' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'enquiries' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="mail" size={18} /> Enquiries
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'feedback' ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeTab === 'feedback' ? '#d9f26a' : '#aebfb5', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '14px', transition: '0.2s' }}
          >
            <Icon name="check" size={18} /> User Feedback
          </button>
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#aebfb5', fontSize: '14px', fontWeight: 600 }}>
            <Icon name="arrow" size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1a202c' }}>
            {activeTab === 'dashboard' && 'Admin Overview'}
            {activeTab === 'users' && 'Registered Users'}
            {activeTab === 'loans' && 'Manage Loans'}
            {activeTab === 'kyc' && 'KYC Verification'}
            {activeTab === 'emi' && 'EMI Tracking'}
            {activeTab === 'reports' && 'System Reports'}
            {activeTab === 'enquiries' && 'Contact Enquiries'}
            {activeTab === 'feedback' && 'User Feedback'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: '#f1f5f9', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}>
              <Icon name="chart" size={18} />
            </div>
            
            <div className="admin-profile-dropdown" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 0' }}>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: '#1e293b' }}>{JSON.parse(localStorage.getItem('adminUser') || '{}').name || 'Admin User'}</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Superadmin</span>
              </div>
              <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', overflow: 'hidden', border: '2px solid #163a2a' }}>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(JSON.parse(localStorage.getItem('adminUser') || '{}').name || 'Admin')}&background=163a2a&color=fff`} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* Hover Dropdown Menu */}
              <div className="admin-dropdown-content" style={{ position: 'absolute', top: '100%', right: '0', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '220px', overflow: 'hidden', zIndex: 100, display: 'none', flexDirection: 'column' }}>
                <div style={{ padding: '15px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#1e293b' }}>Account Options</strong>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Manage your credentials</span>
                </div>
                <button onClick={() => setActiveTab('settings')} style={{ padding: '12px 15px', border: 'none', borderBottom: '1px solid #f1f5f9', background: 'white', textAlign: 'left', fontSize: '13px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="mail" size={14} /> Change Email ID
                </button>
                <button onClick={() => setActiveTab('settings')} style={{ padding: '12px 15px', border: 'none', borderBottom: '1px solid #f1f5f9', background: 'white', textAlign: 'left', fontSize: '13px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="shield" size={14} /> Change Phone Number
                </button>
                <button onClick={() => setActiveTab('settings')} style={{ padding: '12px 15px', border: 'none', borderBottom: '1px solid #f1f5f9', background: 'white', textAlign: 'left', fontSize: '13px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="receipt" size={14} /> Change Password
                </button>
                <button 
                  onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); navigate('/admin/login'); }}
                  style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '12px 15px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}
                >
                  <Icon name="close" size={14} /> Secure Logout
                </button>
              </div>

              {/* Inline CSS to handle the hover state for the dropdown */}
              <style>{`
                .admin-profile-dropdown:hover .admin-dropdown-content {
                  display: flex !important;
                }
                .admin-dropdown-content button:hover {
                  background: #f8fafc !important;
                  color: #1e293b !important;
                }
              `}</style>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="clock" size={14} /> Pending Approvals</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>{allLoans.filter(l => l.status === 'pending').length}</strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Applications</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="receipt" size={14} /> Active Loans</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>{allLoans.filter(l => l.status === 'approved').length}</strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Approved</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="chart" size={14} /> Total Disbursed</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>₹0</strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f1f5f9', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>YTD</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="shield" size={14} /> Pending KYC</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>0</strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>None</span>
                </div>
              </div>

              <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#1e293b' }}>Platform Statistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="users" size={14} /> Total Farmers</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>
                    {allUsers.filter(u => u.role.toLowerCase() === 'farmer').length}
                  </strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f0fdf4', color: '#166534', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Registered Users</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="store" size={14} /> Total Merchants</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>
                    {allUsers.filter(u => u.role.toLowerCase() === 'merchant').length}
                  </strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f0fdf4', color: '#166534', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Registered Users</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="mail" size={14} /> Total Enquiries</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>
                    {allEnquiries.filter(e => e.type !== 'Feedback').length}
                  </strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Contact Forms</span>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="check" size={14} /> User Feedback</p>
                  <strong style={{ display: 'block', fontSize: '24px', color: '#1e293b', lineHeight: 1 }}>
                    {allEnquiries.filter(e => e.type === 'Feedback').length}
                  </strong>
                  <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>Feedback Forms</span>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Recent Credit Limit Applications</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                        <th style={{ padding: '16px 24px', fontWeight: 600 }}>Applicant</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600 }}>Amount</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600 }}>Purpose</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '16px 24px', fontWeight: 600 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLoans.slice(0, 5).map((loan) => (
                        <tr key={loan._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500 }}>{loan.userId?.name || 'Unknown'}</td>
                          <td style={{ padding: '16px 24px', color: '#475569', fontWeight: 'bold' }}>₹{loan.amount.toLocaleString()}</td>
                          <td style={{ padding: '16px 24px', color: '#475569', textTransform: 'capitalize' }}>{loan.purpose}</td>
                          <td style={{ padding: '16px 24px' }}>
                            <span style={{ 
                              background: loan.status === 'pending' ? '#fef08a' : loan.status === 'approved' ? '#bbf7d0' : '#fecaca', 
                              color: loan.status === 'pending' ? '#854d0e' : loan.status === 'approved' ? '#166534' : '#991b1b', 
                              padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' 
                            }}>
                              {loan.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            <button onClick={() => setActiveTab('loans')} style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>View All</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>All Registered Users</h3>
                <button style={{ background: '#163a2a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Email ID</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Phone No.</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Role</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Reg. Date</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>{row.email}</td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>{row.phone}</td>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500 }}>{row.role}</td>
                        <td style={{ padding: '16px 24px', color: '#64748b' }}>{row.date}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ background: row.bg, color: row.color, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Contact Form Enquiries</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Contact Info</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Business Type</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Message</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEnquiries.filter(e => e.type !== 'Feedback').map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600, verticalAlign: 'top' }}>{row.name}</td>
                        <td style={{ padding: '16px 24px', color: '#475569', verticalAlign: 'top' }}>
                          <div style={{ marginBottom: '4px' }}>{row.email}</div>
                          <div>{row.phone}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 500, verticalAlign: 'top' }}>{row.type}</td>
                        <td style={{ padding: '16px 24px', color: '#475569', maxWidth: '300px', verticalAlign: 'top' }}>{row.message}</td>
                        <td style={{ padding: '16px 24px', color: '#64748b', verticalAlign: 'top' }}>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>User Feedback</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>User Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Contact Info</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Feedback Message</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEnquiries.filter(e => e.type === 'Feedback').map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600, verticalAlign: 'top' }}>{row.name}</td>
                        <td style={{ padding: '16px 24px', color: '#475569', verticalAlign: 'top' }}>
                          <div style={{ marginBottom: '4px' }}>{row.email}</div>
                          <div>{row.phone}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#475569', maxWidth: '400px', verticalAlign: 'top' }}>{row.message}</td>
                        <td style={{ padding: '16px 24px', color: '#64748b', verticalAlign: 'top' }}>{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Manage Credit Limits</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Applicant</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Amount</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Purpose</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Tenure</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLoans.map((loan) => (
                      <tr key={loan._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600 }}>
                          {loan.userId?.name || 'Unknown'}
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>{loan.userId?.phone || ''}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#475569', fontWeight: 'bold' }}>₹{loan.amount.toLocaleString()}</td>
                        <td style={{ padding: '16px 24px', color: '#475569', textTransform: 'capitalize' }}>{loan.purpose}</td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>{loan.tenure} Months</td>
                        <td style={{ padding: '16px 24px', color: '#64748b' }}>{new Date(loan.appliedAt).toLocaleDateString()}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            background: loan.status === 'pending' ? '#fef08a' : loan.status === 'approved' ? '#bbf7d0' : '#fecaca', 
                            color: loan.status === 'pending' ? '#854d0e' : loan.status === 'approved' ? '#166534' : '#991b1b', 
                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' 
                          }}>
                            {loan.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          {loan.status === 'pending' ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleUpdateLoan(loan._id, 'approved')} style={{ background: '#16a34a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                              <button onClick={() => handleUpdateLoan(loan._id, 'rejected')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                            </div>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}>Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allLoans.length === 0 && (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No loan applications found.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 25px', color: '#1e293b' }}>Admin Account Settings</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Settings updated successfully! (Demo)'); }}>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '16px', color: '#163a2a', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Profile Information</h3>
                  
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Full Name</label>
                      <input type="text" defaultValue={JSON.parse(localStorage.getItem('adminUser') || '{}').name} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Email Address</label>
                      <input type="email" defaultValue={JSON.parse(localStorage.getItem('adminUser') || '{}').email} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Phone Number</label>
                    <input type="tel" defaultValue="+91 9876543210" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    <small style={{ color: '#64748b', marginTop: '5px', display: 'block' }}>Changing your number will require OTP verification.</small>
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '16px', color: '#163a2a', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Security (Change Password)</h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Current Password</label>
                    <input type="password" placeholder="Enter current password" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </div>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>New Password</label>
                      <input type="password" placeholder="Enter new password" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                  <button type="button" onClick={() => setActiveTab('dashboard')} style={{ padding: '12px 20px', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                  <button type="submit" className="button" style={{ padding: '12px 24px', borderRadius: '6px' }}>Save Changes</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'emi' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>EMI & Loan Tracking</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Farmer Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Loan Limit</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Withdrawn Amount</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>EMI Paid</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Outstanding EMI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLoans.filter(l => l.status === 'approved').map((loan) => {
                      const amountPaid = loan.amountPaid || 0;
                      const withdrawnAmount = loan.withdrawnAmount || 0;
                      const totalPayable = Math.round(loan.amount * 1.1); // 10% interest assumed
                      const outstanding = totalPayable - amountPaid;

                      return (
                        <tr key={loan._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600 }}>
                            {loan.userId?.name || 'Unknown'}
                          </td>
                          <td style={{ padding: '16px 24px', color: '#475569', fontWeight: 'bold' }}>₹{loan.amount.toLocaleString()}</td>
                          <td style={{ padding: '16px 24px', color: withdrawnAmount > 0 ? '#b91c1c' : '#475569', fontWeight: 600 }}>₹{withdrawnAmount.toLocaleString()}</td>
                          <td style={{ padding: '16px 24px', color: '#16a34a', fontWeight: 600 }}>₹{amountPaid.toLocaleString()}</td>
                          <td style={{ padding: '16px 24px', color: outstanding <= 0 ? '#16a34a' : '#ea580c', fontWeight: 600 }}>
                            {outstanding <= 0 ? 'Clear' : `₹${outstanding.toLocaleString()}`}
                          </td>
                        </tr>
                      );
                    })}
                    {allLoans.filter(l => l.status === 'approved').length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No approved loans to track yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Farmer KYC Approvals</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Farmer Name</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Contact Info</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Submitted Docs</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>KYC Status</th>
                      <th style={{ padding: '16px 24px', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.filter(u => u.role === 'farmer').map((user) => (
                      <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600 }}>{user.name}</td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>
                          <div style={{ marginBottom: '4px' }}>{user.email}</div>
                          <div>{user.phone}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: '#475569' }}>
                          <span style={{ display: 'inline-block', padding: '4px 8px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '5px' }}>Aadhaar Card</span>
                          <span style={{ display: 'inline-block', padding: '4px 8px', background: '#f1f5f9', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>PAN Card</span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            background: user.kycStatus === 'pending' || !user.kycStatus ? '#fef08a' : user.kycStatus === 'verified' ? '#bbf7d0' : '#fecaca', 
                            color: user.kycStatus === 'pending' || !user.kycStatus ? '#854d0e' : user.kycStatus === 'verified' ? '#166534' : '#991b1b', 
                            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' 
                          }}>
                            {user.kycStatus || 'pending'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          {user.kycStatus === 'pending' || !user.kycStatus ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button onClick={() => handleUpdateKyc(user._id, 'verified')} style={{ background: '#16a34a', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Verify</button>
                              <button onClick={() => handleUpdateKyc(user._id, 'rejected')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                            </div>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}>Reviewed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {allUsers.filter(u => u.role === 'farmer').length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No farmers found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: '#1e293b' }}>Financial Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Loan Value Approved</p>
                    <strong style={{ fontSize: '24px', color: '#16a34a' }}>
                      ₹{allLoans.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.amount || 0), 0).toLocaleString()}
                    </strong>
                  </div>
                  <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total EMI Collected</p>
                    <strong style={{ fontSize: '24px', color: '#0284c7' }}>
                      ₹{allLoans.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.amountPaid || 0), 0).toLocaleString()}
                    </strong>
                  </div>
                  <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Funds Withdrawn</p>
                    <strong style={{ fontSize: '24px', color: '#ea580c' }}>
                      ₹{allLoans.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.withdrawnAmount || 0), 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: '#1e293b' }}>User Acquisition</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#166534', fontWeight: 600 }}>Total Verified Farmers</p>
                    <strong style={{ fontSize: '24px', color: '#166534' }}>
                      {allUsers.filter(u => u.role === 'farmer' && u.kycStatus === 'verified').length}
                    </strong>
                  </div>
                  <div style={{ padding: '15px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#991b1b', fontWeight: 600 }}>Pending KYC Approvals</p>
                    <strong style={{ fontSize: '24px', color: '#991b1b' }}>
                      {allUsers.filter(u => u.role === 'farmer' && (u.kycStatus === 'pending' || !u.kycStatus)).length}
                    </strong>
                  </div>
                  <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#1e3a8a', fontWeight: 600 }}>Total Active Merchants</p>
                    <strong style={{ fontSize: '24px', color: '#1e3a8a' }}>
                      {allUsers.filter(u => u.role === 'merchant').length}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Monthly Loan Performance</h3>
                    <button style={{ background: '#163a2a', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Download PDF</button>
                  </div>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Jan', Disbursed: 0, Collected: 0 },
                        { name: 'Feb', Disbursed: 0, Collected: 0 },
                        { name: 'Mar', Disbursed: 0, Collected: 0 },
                        { name: 'Apr', Disbursed: 0, Collected: 0 },
                        { name: 'May', Disbursed: 0, Collected: 0 },
                        { name: 'Jun', Disbursed: allLoans.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.amount || 0), 0), Collected: allLoans.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.amountPaid || 0), 0) },
                      ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `₹${val/1000}k`} />
                        <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="Disbursed" fill="#163a2a" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="Collected" fill="#d9f26a" radius={[4, 4, 0, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: '#1e293b' }}>User Demographics</h3>
                  <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Farmers', value: allUsers.filter(u => u.role === 'farmer').length },
                            { name: 'Merchants', value: allUsers.filter(u => u.role === 'merchant').length },
                            { name: 'Admins', value: allUsers.filter(u => u.role === 'admin').length }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#16a34a" />
                          <Cell fill="#0284c7" />
                          <Cell fill="#475569" />
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'users' && activeTab !== 'loans' && activeTab !== 'farmers' && activeTab !== 'merchants' && activeTab !== 'enquiries' && activeTab !== 'feedback' && activeTab !== 'settings' && activeTab !== 'emi' && activeTab !== 'kyc' && activeTab !== 'reports' && (
            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#94a3b8' }}>
                <Icon name="clock" size={32} />
              </div>
              <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#1e293b' }}>Module Under Construction</h3>
              <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>The {activeTab} module is currently being developed. Please check back later.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
