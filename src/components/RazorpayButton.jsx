import { useState } from 'react';
import { Icon } from './Icons';

export default function RazorpayButton({ amount, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => {
    setShowModal(true);
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);
      if (onSuccess) onSuccess();
      alert('Payment of ₹' + amount.toLocaleString() + ' successful! (Test Mode)');
    }, 2000);
  };

  return (
    <>
      <button 
        onClick={handlePayment} 
        className="button button-sm mt-2" 
        style={{ marginTop: '15px', width: '100%', background: '#3396FF', color: 'white', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
      >
        <Icon name="shield" size={14} /> Pay ₹{amount.toLocaleString()}
      </button>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>Razorpay Test Environment</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>This is a simulated payment gateway.</p>
            </div>
            
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Amount to Pay</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#163a2a' }}>₹{amount.toLocaleString()}</div>
            </div>

            <button 
              onClick={simulatePayment} 
              disabled={isProcessing}
              style={{ width: '100%', padding: '14px', background: '#3396FF', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: isProcessing ? 'wait' : 'pointer' }}
            >
              {isProcessing ? 'Processing...' : 'Simulate Success Payment'}
            </button>
            
            <button 
              onClick={() => setShowModal(false)} 
              style={{ background: 'transparent', border: 'none', color: '#64748b', marginTop: '15px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
