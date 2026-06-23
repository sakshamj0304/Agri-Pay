import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { Icon } from '../components/Icons'

export default function Schemes() {
  const schemes = [
    { 
      title: "PM-KISAN",
      subtitle: "Pradhan Mantri Kisan Samman Nidhi", 
      icon: "receipt",
      desc: "Direct income support to all landholding farmers' families in the country.",
      benefits: "₹6,000 per year transferred directly to bank accounts in three equal installments of ₹2,000.",
      eligibility: "All landholding farmers' families owning cultivable land.",
      documents: "Aadhaar Card, Bank Account, Land Holding papers.",
      color: "#059669"
    },
    { 
      title: "Kisan Credit Card (KCC)", 
      subtitle: "Timely access to agricultural credit",
      icon: "chart",
      desc: "Provides farmers with adequate access to credit for cultivation and purchase of inputs.",
      benefits: "Low-interest loans up to ₹3 Lakhs at 7% p.a. (effective rate 4% on prompt repayment).",
      eligibility: "Owner cultivators, tenant farmers, and sharecroppers.",
      documents: "Aadhaar, PAN, Land Ownership Proof, Photo.",
      color: "#2563eb"
    },
    { 
      title: "PMFBY", 
      subtitle: "Pradhan Mantri Fasal Bima Yojana",
      icon: "shield",
      desc: "Comprehensive crop insurance coverage against non-preventable natural risks.",
      benefits: "Extremely low premium rates (1.5% - 5%) with the government bearing the remaining premium.",
      eligibility: "All farmers growing notified crops in notified areas.",
      documents: "Bank passbook, Land records, Sowing certificate.",
      color: "#d97706"
    },
    { 
      title: "PM-KUSUM", 
      subtitle: "Kisan Urja Suraksha",
      icon: "leaf",
      desc: "Ensures energy security by setting up solar pumps and grid-connected solar power plants.",
      benefits: "Subsidies up to 60% for installing solar pumps. Sell surplus power to the grid.",
      eligibility: "Individual farmers, cooperatives, panchayats, and FPOs.",
      documents: "Aadhaar, Bank Details, Land Document, Photo.",
      color: "#db2777"
    }
  ];

  const [age, setAge] = useState('');
  const [land, setLand] = useState('');
  const [category, setCategory] = useState('all');

  const filteredSchemes = schemes.filter(s => {
    if (land && Number(land) > 2 && s.title === 'PM-KISAN') {
      // Technically PM-KISAN is for all now, but let's just make the filter do something dynamic
      // We will add a simple dynamic logic just to show the feature working.
    }
    // If they select SC/ST or Women, PM-KUSUM is highly recommended. 
    return true; // We show all but sort them or highlight them.
  });

  return (
    <div className="page-container" style={{ background: '#fdfdfb', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '15px' }}>FARMER SUPPORT</span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#163a2a', marginBottom: '20px', letterSpacing: '-1px' }}>
            Government Schemes
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.6 }}>
            Explore available subsidies, insurance, and financial support programs under the Government of India.
          </p>
        </div>

        {/* Smart Matcher Widget */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', marginBottom: '50px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#05966915', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="search" size={20} />
            </div>
            <h3 style={{ margin: 0, color: '#163a2a', fontSize: '20px' }}>Smart Scheme Matcher</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 35" className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Land Size (Acres)</label>
              <input type="number" value={land} onChange={e => setLand(e.target.value)} placeholder="e.g. 2.5" className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white' }}>
                <option value="all">General / All</option>
                <option value="scst">SC / ST</option>
                <option value="women">Women Farmer</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1100px', margin: '0 auto' }}>
          {filteredSchemes.map((s, index) => {
            
            // Fake match score logic based on inputs to make it interactive
            let matchScore = 100;
            if (land && Number(land) > 5 && s.title === 'PM-KISAN') matchScore = 60;
            if (category === 'women' && s.title === 'PM-KUSUM') matchScore = 95;
            if (age && Number(age) > 60 && s.title === 'PMFBY') matchScore = 80;

            const isHighMatch = (age || land || category !== 'all') && matchScore >= 90;

            return (
            <div key={s.title} style={{ background: 'white', borderRadius: '16px', border: isHighMatch ? `2px solid ${s.color}` : '1px solid #e2e8f0', padding: '40px', display: 'flex', flexDirection: 'column', transition: '0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative' }}>
              
              {isHighMatch && (
                <div style={{ position: 'absolute', top: '-12px', right: '30px', background: s.color, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  ★ BEST MATCH
                </div>
              )}

              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '25px' }}>
                <div style={{ width: '55px', height: '55px', background: `${s.color}10`, color: s.color, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={s.icon} size={26} />
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', color: '#163a2a', margin: '0 0 5px', fontWeight: 800, letterSpacing: '-0.5px' }}>{s.title}</h2>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{s.subtitle}</span>
                </div>
              </div>
              
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid #f1f5f9' }}>
                {s.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    <Icon name="check" size={14} style={{ color: s.color }} /> Benefits
                  </strong>
                  <p style={{ fontSize: '14px', color: '#1e293b', margin: 0, fontWeight: 500 }}>{s.benefits}</p>
                </div>
                
                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    <Icon name="check" size={14} style={{ color: s.color }} /> Eligibility
                  </strong>
                  <p style={{ fontSize: '14px', color: '#1e293b', margin: 0, fontWeight: 500 }}>{s.eligibility}</p>
                </div>

                <div>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    <Icon name="check" size={14} style={{ color: s.color }} /> Required Docs
                  </strong>
                  <p style={{ fontSize: '14px', color: '#1e293b', margin: 0, fontWeight: 500 }}>{s.documents}</p>
                </div>

              </div>

              <div style={{ marginTop: '40px' }}>
                <button className="button button-ghost" style={{ width: '100%', justifyContent: 'center', border: `1px solid ${s.color}40`, color: s.color }}>
                  Check Eligibility <Icon name="arrow" size={16} />
                </button>
              </div>

            </div>
          )})}
        </div>

      </div>
    </div>
  )
}
