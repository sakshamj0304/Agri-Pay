import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icons';
import RazorpayButton from '../components/RazorpayButton';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [user, setUser] = useState({ name: '', phone: '', email: '', referralCode: '' });
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingLoans, setLoadingLoans] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // If the URL parameter changes, update the tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab || 'overview');
  }, [searchParams]);

  const fetchLoans = () => {
    const token = localStorage.getItem('token');
    fetch('/api/loans/my-loans', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLoans(data);
        setLoadingLoans(false);
      })
      .catch(err => {
        console.error('Failed to fetch loans:', err);
        setLoadingLoans(false);
      });
  };

  const fetchTransactions = () => {
    setLoadingTransactions(true);
    const token = localStorage.getItem('token');
    fetch('/api/transactions/my-passbook', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTransactions(data);
        setLoadingTransactions(false);
      })
      .catch(err => {
        console.error('Failed to fetch transactions:', err);
        setLoadingTransactions(false);
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ name: parsed.name, email: parsed.email, phone: parsed.phone || '', referralCode: parsed.referralCode || 'AGRI1234' });
    }

    fetchLoans();
    if (activeTab === 'passbook') fetchTransactions();
  }, [navigate, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Settings saved successfully! (Demo)');
  };

  // Calculations based on loans
  const approvedLoans = loans.filter(l => l.status === 'approved');
  
  // Real wallet balance logic: loan amount minus what is already withdrawn
  const totalWallet = approvedLoans.reduce((sum, l) => sum + (l.amount - (l.withdrawnAmount || 0)), 0);
  
  // Active loan for EMI and Withdrawals
  const activeLoan = approvedLoans[0]; // Assuming one active loan for simplicity

  let nextEmi = 0;
  if (activeLoan) {
    const totalPayable = Math.round(activeLoan.amount * 1.1); // 10% total interest
    const amountPaid = activeLoan.amountPaid || 0;
    
    if (amountPaid < totalPayable) {
       // Simple calculation for next EMI installment
       const t = activeLoan.tenure || 12;
       const standardEmi = Math.round(totalPayable / t);
       // Ensure we don't ask for more than what's left
       nextEmi = Math.min(standardEmi, totalPayable - amountPaid);
    }
  }

  const kycStatus = approvedLoans.length > 0 
    ? { count: '4/4', text: 'KYC Verified', color: '#16a34a' } 
    : { count: '0/4', text: 'KYC Pending', color: '#ef4444' };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return alert('Enter a valid amount');
    if (Number(withdrawAmount) > totalWallet) return alert('Cannot withdraw more than Wallet Balance');
    
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/loans/withdraw/${activeLoan._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(withdrawAmount) })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('Withdrawal of ₹' + withdrawAmount + ' successful! It will reflect in your bank shortly.');
        setShowWithdrawModal(false);
        setWithdrawAmount('');
        fetchLoans(); // Refresh balances
      } else {
        alert(data.error || 'Withdrawal failed');
      }
    } catch (err) {
      alert('Server error');
    }
    setIsProcessing(false);
  };

  const handleEmiSuccess = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/loans/pay-emi/${activeLoan._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount: nextEmi })
      });
      
      if (res.ok) {
        fetchLoans(); // Refresh to update EMI due
      }
    } catch (err) {
      console.error('Failed to update EMI payment in DB');
    }
  };

  return (
    <div className="page-container bg-light" style={{ minHeight: '80vh' }}>
      <div className="container py-5">
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
          <button 
            onClick={() => { setActiveTab('overview'); navigate('?tab=overview'); }}
            style={{ padding: '10px 20px', background: activeTab === 'overview' ? '#163a2a' : 'transparent', color: activeTab === 'overview' ? 'white' : '#64748b', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Overview
          </button>
          <button 
            onClick={() => { setActiveTab('passbook'); navigate('?tab=passbook'); fetchTransactions(); }}
            style={{ padding: '10px 20px', background: activeTab === 'passbook' ? '#163a2a' : 'transparent', color: activeTab === 'passbook' ? 'white' : '#64748b', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Passbook
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); navigate('?tab=settings'); }}
            style={{ padding: '10px 20px', background: activeTab === 'settings' ? '#163a2a' : 'transparent', color: activeTab === 'settings' ? 'white' : '#64748b', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Settings
          </button>
        </div>

        {/* Main Content Area */}
        <main style={{ maxWidth: '900px', margin: '0 auto' }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '30px' }}>
                <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '10px' }}>PORTAL</span>
                <h2 style={{ fontSize: '32px', margin: 0 }}>Welcome back, {user.name.split(' ')[0]}!</h2>
                <p style={{ color: '#64748b' }}>Manage your active loans, wallet, and settings here.</p>
              </div>

              {/* Weather Widget */}
              <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '16px', padding: '25px', color: 'white', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '48px' }}>☀️</div>
                  <div>
                    <h3 style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: 'bold' }}>32°C, Sunny</h3>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '15px' }}>Pune, Maharashtra</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 20px', borderRadius: '12px', maxWidth: '300px', textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 'bold', color: '#bfdbfe' }}>Crop Advisory</div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>Perfect weather for harvesting Wheat. Light showers expected on Thursday.</p>
                </div>
              </div>
              
              <div className="dashboard-grid">
                <div className="stat-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '18px', color: '#163a2a', margin: 0 }}>My Loans</h3>
                    <button onClick={() => navigate('/apply-loan')} className="button button-sm">Apply New Loan</button>
                  </div>
                  
                  {loadingLoans ? (
                    <p style={{ color: '#64748b' }}>Loading loans...</p>
                  ) : loans.length === 0 ? (
                    <div style={{ padding: '30px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                      <p style={{ color: '#64748b', marginBottom: '15px' }}>You don't have any active loan applications.</p>
                      <button onClick={() => navigate('/apply-loan')} className="button button-sm button-ghost" style={{ border: '1px solid #6c8f39', color: '#6c8f39' }}>Apply for AgriPay Credit</button>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                            <th style={{ padding: '12px 10px' }}>Date</th>
                            <th style={{ padding: '12px 10px' }}>Amount</th>
                            <th style={{ padding: '12px 10px' }}>Purpose</th>
                            <th style={{ padding: '12px 10px' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loans.map(loan => (
                            <tr key={loan._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '15px 10px', fontSize: '14px' }}>{new Date(loan.appliedAt).toLocaleDateString()}</td>
                              <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>₹{loan.amount.toLocaleString()}</td>
                              <td style={{ padding: '15px 10px', textTransform: 'capitalize' }}>{loan.purpose}</td>
                              <td style={{ padding: '15px 10px' }}>
                                <span style={{ 
                                  padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase',
                                  background: loan.status === 'pending' ? '#fef08a' : loan.status === 'approved' ? '#bbf7d0' : loan.status === 'rejected' ? '#fecaca' : '#e0e7ff',
                                  color: loan.status === 'pending' ? '#854d0e' : loan.status === 'approved' ? '#166534' : loan.status === 'rejected' ? '#991b1b' : '#3730a3'
                                }}>
                                  {loan.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="stat-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', color: '#475569', marginBottom: '10px' }}>Next EMI Due</h3>
                  <div className="stat-value" style={{ fontSize: '28px', fontWeight: 800 }}>₹{nextEmi.toLocaleString()}</div>
                  {nextEmi > 0 ? (
                    <>
                      <small style={{ color: '#ef4444', display: 'block', marginTop: '5px', fontWeight: 600 }}>Due in 5 days</small>
                      <RazorpayButton amount={nextEmi} onSuccess={handleEmiSuccess} />
                    </>
                  ) : (
                    <>
                      <small style={{ color: '#64748b', display: 'block', marginTop: '5px', fontWeight: 600 }}>No upcoming payments</small>
                      <button className="button button-sm mt-2" style={{ marginTop: '15px', width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>Pay Now</button>
                    </>
                  )}
                </div>
                <div className="stat-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', color: '#475569', marginBottom: '10px' }}>Wallet Balance</h3>
                  <div className="stat-value" style={{ fontSize: '28px', fontWeight: 800 }}>₹{totalWallet.toLocaleString()}</div>
                  <button onClick={() => setShowWithdrawModal(true)} className="button button-sm button-ghost mt-2" style={{ marginTop: '15px', width: '100%', border: '1px solid #cbd5e1', opacity: totalWallet > 0 ? 1 : 0.5, cursor: totalWallet > 0 ? 'pointer' : 'not-allowed' }} disabled={totalWallet <= 0}>Withdraw</button>
                </div>
                <div className="stat-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', color: '#475569', marginBottom: '10px' }}>My Documents</h3>
                  <div className="stat-value" style={{ fontSize: '28px', fontWeight: 800 }}>{kycStatus.count}</div>
                  <small style={{ color: kycStatus.color, display: 'block', marginTop: '5px', fontWeight: 600 }}>{kycStatus.text}</small>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'passbook' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '24px', margin: 0, color: '#1e293b' }}>My Passbook</h2>
                <div style={{ background: '#f8fafc', padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', display: 'block' }}>Available Wallet Balance</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#163a2a' }}>₹{totalWallet.toLocaleString()}</span>
                </div>
              </div>
              
              {loadingTransactions ? (
                <p style={{ color: '#64748b' }}>Loading transactions...</p>
              ) : transactions.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                  <Icon name="receipt" size={48} style={{ color: '#94a3b8', margin: '0 auto 15px' }} />
                  <p style={{ color: '#64748b', fontSize: '16px' }}>No transactions found.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                        <th style={{ padding: '15px 10px' }}>Date</th>
                        <th style={{ padding: '15px 10px' }}>Description</th>
                        <th style={{ padding: '15px 10px' }}>Type</th>
                        <th style={{ padding: '15px 10px', textAlign: 'right' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(txn => {
                        const isCredit = ['loan_disbursement', 'referral_bonus'].includes(txn.type);
                        return (
                          <tr key={txn._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '15px 10px', fontSize: '14px', color: '#475569' }}>
                              {new Date(txn.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td style={{ padding: '15px 10px', fontSize: '15px', color: '#1e293b', fontWeight: 500 }}>
                              {txn.description}
                            </td>
                            <td style={{ padding: '15px 10px' }}>
                              <span style={{ 
                                padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase',
                                background: isCredit ? '#dcfce7' : '#fee2e2',
                                color: isCredit ? '#166534' : '#991b1b'
                              }}>
                                {txn.type.replace('_', ' ')}
                              </span>
                            </td>
                            <td style={{ padding: '15px 10px', fontSize: '16px', fontWeight: 'bold', textAlign: 'right', color: isCredit ? '#16a34a' : '#ef4444' }}>
                              {isCredit ? '+' : '-'} ₹{txn.amount.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '24px', margin: '0 0 25px', color: '#1e293b' }}>Account Settings</h2>
              
              <form onSubmit={handleSaveSettings}>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '16px', color: '#163a2a', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Profile Information</h3>
                  
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Full Name</label>
                      <input type="text" defaultValue={user.name} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Email Address</label>
                      <input type="email" defaultValue={user.email} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>Phone Number (Change Number)</label>
                    <input type="tel" defaultValue={user.phone} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
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

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '16px', color: '#163a2a', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Refer & Earn</h3>
                  <div style={{ background: '#f0fdf4', border: '1px dashed #16a34a', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px', color: '#166534', fontSize: '16px' }}>Invite Farmers & Earn ₹100!</h4>
                      <p style={{ margin: 0, color: '#15803d', fontSize: '14px' }}>Share your unique referral code with friends.</p>
                    </div>
                    <div style={{ background: 'white', border: '1px solid #16a34a', padding: '10px 20px', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', color: '#163a2a', letterSpacing: '1px' }}>
                      {user.referralCode}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                  <button type="button" onClick={() => setActiveTab('overview')} style={{ padding: '12px 20px', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                  <button type="submit" className="button" style={{ padding: '12px 24px', borderRadius: '6px' }}>Save Changes</button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {showWithdrawModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '20px' }}>Withdraw to Bank</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Transfer funds directly to your registered bank account.</p>
            
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Available Balance</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#163a2a' }}>₹{totalWallet.toLocaleString()}</div>
            </div>

            <form onSubmit={handleWithdraw}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>Amount to Withdraw</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold', color: '#64748b' }}>₹</span>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount" 
                    max={totalWallet}
                    required
                    style={{ width: '100%', padding: '12px 12px 12px 35px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '16px' }} 
                  />
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: '#1e293b' }}>Bank Account</label>
                <select style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '15px', background: 'white' }}>
                  <option>State Bank of India (**** 1234)</option>
                  <option>HDFC Bank (**** 5678)</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                style={{ width: '100%', padding: '14px', background: '#163a2a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: isProcessing ? 'wait' : 'pointer', marginBottom: '10px' }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
              </button>
              
              <button 
                type="button"
                onClick={() => setShowWithdrawModal(false)} 
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontWeight: 600, padding: '10px' }}
                disabled={isProcessing}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
