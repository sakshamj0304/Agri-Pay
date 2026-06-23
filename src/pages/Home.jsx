import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import SectionHeader from '../components/SectionHeader'
import HeroVisual from '../components/HeroVisual'

const stats = [
  { value: '0', label: 'Farmers Onboarded' },
  { value: '₹0', label: 'Loans Disbursed' },
  { value: '0', label: 'Villages Covered' },
  { value: '0%', label: 'Recovery Rate' }
]

const problems = [
  ['receipt', 'Informal udhaar', 'Paper ledgers and memory-based credit make every transaction harder to track.'],
  ['clock', 'Delayed repayments', 'No clear schedules or reminders means merchants carry uncertainty for months.'],
  ['lock', 'Limited formal access', 'Thin-file farmers are often invisible to traditional credit systems.'],
  ['shield', 'Merchant risk', 'Local retailers absorb defaults despite knowing their customers best.']
]

const benefits = [
  { icon: 'calendar', title: 'Crop-Cycle Linked EMIs', desc: 'Repay when you harvest. We align your loan schedule with your actual income flow.' },
  { icon: 'shield', title: 'Zero Hidden Charges', desc: '100% transparent pricing. You only pay the interest rate you agreed to upfront.' },
  { icon: 'check', title: 'No Collateral Up To ₹1L', desc: 'Get quick access to working capital without risking your land or assets.' },
  { icon: 'chat', title: 'Local Languages', desc: 'Our app and support are available in Hindi, Marathi, Telugu, and more.' }
]

const partners = [
  'HDFC Bank', 'SBI', 'Nabard', 'Axis Bank', 'Mahindra Finance', 'Kotak'
]

export default function Home() {
  const [emiAmount, setEmiAmount] = useState(50000);
  const [emiMonths, setEmiMonths] = useState(12);
  const monthlyPayment = Math.round((emiAmount + (emiAmount * 0.12 * (emiMonths/12))) / emiMonths);

  return <>
    {/* Hero Section */}
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span></span> BUILT FOR RURAL INDIA
          </div>
          <h1>Empowering Farmers with <br/><em>Instant Digital Credit.</em></h1>
          <p>Get loans up to ₹5,00,000 in just 5 minutes with 100% digital KYC. No branch visits required.</p>
          <div className="hero-actions">
            <Link className="button button-large" to="/loans" style={{ fontSize: '18px', padding: '16px 28px' }}>
              Apply Loan Now <Icon name="arrow" size={18}/>
            </Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><i>स</i><i>R</i><i>ਕ</i></div>
            <span><strong>Designed around trust</strong><br/>Simple, local and transparent</span>
          </div>
        </div>
        
        <HeroVisual />
      </div>
    </section>

    {/* Partners Section (Option 3) */}
    <div style={{ background: '#fff', padding: '30px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#64748b', display: 'block', marginBottom: '20px' }}>TRUSTED LENDING PARTNERS</span>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', opacity: 0.6, fontWeight: 800, fontSize: '20px', color: '#163a2a' }}>
          {partners.map(p => <span key={p}>{p}</span>)}
        </div>
      </div>
    </div>

    {/* How It Works Flow (Option 1) */}
    <section className="section bg-light" style={{ padding: '80px 0' }}>
      <div className="container">
        <SectionHeader eyebrow="HOW IT WORKS" center title={<>Get your loan in <span className="accent">4 simple steps</span></>} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '50px', position: 'relative' }}>
          {[
            { step: 1, title: 'Register', desc: 'Sign up with your mobile number.' },
            { step: 2, title: 'Digital KYC', desc: 'Upload Aadhaar & PAN securely.' },
            { step: 3, title: 'Approval', desc: 'Get instant credit limit approval.' },
            { step: 4, title: 'Disbursal', desc: 'Money sent directly to your bank.' }
          ].map((s, i) => (
            <div key={s.step} style={{ textAlign: 'center', background: 'white', padding: '30px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', position: 'relative', zIndex: 2 }}>
              <div style={{ width: '50px', height: '50px', background: '#d9f26a', borderRadius: '50%', color: '#163a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, margin: '0 auto 20px' }}>
                {s.step}
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Key Benefits (Option 4) & EMI Calculator (Option 2) Split Section */}
    <section className="section" style={{ background: '#163a2a', color: 'white', padding: '100px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
        
        {/* Benefits Grid */}
        <div>
          <SectionHeader eyebrow="WHY AGRIPAY" title={<>Finance designed for the <span style={{ color: '#d9f26a' }}>farming lifecycle</span></>} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
            {benefits.map(b => (
              <div key={b.title}>
                <div style={{ color: '#d9f26a', marginBottom: '15px' }}><Icon name={b.icon} size={28}/></div>
                <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>{b.title}</h4>
                <p style={{ color: '#aabcb2', fontSize: '13px' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mini EMI Calculator */}
        <div style={{ background: '#fff', color: '#1e293b', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Quick EMI Calculator</h3>
          <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px' }}>Estimate your monthly payments instantly.</p>
          
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontWeight: 700, fontSize: '14px' }}>Loan Amount</label>
              <span style={{ fontWeight: 800, color: '#163a2a' }} className="notranslate">₹{emiAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="10000" max="500000" step="5000" 
              value={emiAmount} 
              onChange={e => setEmiAmount(Number(e.target.value))} 
              style={{ 
                width: '100%', 
                accentColor: '#6c8f39',
                height: '6px',
                borderRadius: '4px',
                background: `linear-gradient(to right, #6c8f39 ${((emiAmount - 10000) / 490000) * 100}%, #e2e8f0 ${((emiAmount - 10000) / 490000) * 100}%)`
              }} 
              className="custom-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
              <span>₹10,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontWeight: 700, fontSize: '14px' }}>Tenure (Months)</label>
              <span style={{ fontWeight: 800, color: '#163a2a' }}><span className="notranslate">{emiMonths}</span> Months</span>
            </div>
            <input 
              type="range" min="3" max="36" step="3" 
              value={emiMonths} 
              onChange={e => setEmiMonths(Number(e.target.value))} 
              style={{ 
                width: '100%', 
                accentColor: '#6c8f39',
                height: '6px',
                borderRadius: '4px',
                background: `linear-gradient(to right, #6c8f39 ${((emiMonths - 3) / 33) * 100}%, #e2e8f0 ${((emiMonths - 3) / 33) * 100}%)`
              }} 
              className="custom-range"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
              <span>3 Months</span>
              <span>36 Months</span>
            </div>
          </div>

          <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ color: '#64748b', fontSize: '13px', display: 'block', marginBottom: '5px' }}>Estimated Monthly EMI</span>
            <strong style={{ fontSize: '32px', color: '#6c8f39', display: 'block' }} className="notranslate">₹{monthlyPayment.toLocaleString()}</strong>
            <small style={{ color: '#94a3b8', fontSize: '11px' }}>@12% p.a. interest</small>
          </div>

          <Link to="/apply-loan" className="button" style={{ width: '100%', justifyContent: 'center' }}>Apply Now</Link>
        </div>

      </div>
    </section>

    {/* Banners Recreated from User Uploads */}
    <section className="section bg-light" style={{ padding: '80px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Banner 1: MSMEs & Corporates */}
        <div style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8efdf', color: '#163a2a', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: 700, marginBottom: '20px' }}>
              <Icon name="briefcase" size={14} /> For MSMEs & Corporates
            </div>
            <p style={{ color: '#475569', fontSize: '18px', marginBottom: '15px' }}>Speak to us to unlock your working capital today!</p>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '30px' }}>
              Fast track your business growth with supply chain financing
            </h2>
            <Link to="/contact" className="button button-ghost" style={{ border: '1px solid #cbd5e1', borderRadius: '30px', padding: '12px 30px' }}>Learn more</Link>
          </div>
          <div style={{ background: '#f1f5f9', height: '100%', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
            {/* Visual representation of the truck/man from the banner */}
            <div style={{ position: 'absolute', right: '40px', bottom: '30px', width: '250px', height: '180px', background: '#fca5a5', borderRadius: '16px 40px 16px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '20px' }}>
               <span style={{ fontSize: '60px' }}>🚚</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: '20px', width: '220px', height: '320px', background: '#94a3b8', borderRadius: '100px 100px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
              Businessman
            </div>
          </div>
        </div>

        {/* Banner 2: Proudly Made in India Mosaic */}
        <div style={{ background: '#f4f1ea', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center' }}>
          <div style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#163a2a', lineHeight: 1.2 }}>
              Proudly made<br/>in India, for<br/>rural India
            </h2>
          </div>
          <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', position: 'relative' }}>
             {/* Creating a css mosaic representing the image grid */}
             <div style={{ background: '#4ade80', borderRadius: '16px 0 16px 16px', gridColumn: '1 / span 1', height: '100px', marginTop: '60px' }}></div>
             <div style={{ background: '#fca5a5', borderRadius: '0 0 16px 16px', gridColumn: '2 / span 1', height: '80px' }}></div>
             
             <div style={{ gridColumn: '2 / span 2', gridRow: '1 / span 2', background: 'url(https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400) center/cover', borderRadius: '16px 16px 0 16px', height: '180px' }}></div>
             <div style={{ background: '#22c55e', borderRadius: '16px 16px 16px 0', gridColumn: '4 / span 1', height: '90px' }}></div>
             
             <div style={{ gridColumn: '3 / span 2', gridRow: '2 / span 2', background: 'url(https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?auto=format&fit=crop&q=80&w=400) center/cover', borderRadius: '16px', height: '200px', marginTop: '30px' }}></div>
             
             <div style={{ background: '#16a34a', borderRadius: '16px', gridColumn: '2 / span 1', height: '100px', marginTop: '20px' }}></div>
             <div style={{ background: '#fbd38d', borderRadius: '16px', gridColumn: '1 / span 1', height: '80px', alignSelf: 'end' }}></div>
          </div>
        </div>

      </div>
    </section>

    {/* Original Statistics Section */}
    <section className="stats-section bg-light py-5" style={{ borderTop: '1px solid #e2e8f0' }}>
      <div className="container stats-grid">
        {stats.map(s => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>

  </>
}
