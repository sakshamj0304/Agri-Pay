import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { Icon } from '../components/Icons'

export default function Loans() {
  const kycDocs = [
    { name: 'Aadhaar Card', icon: 'shield', desc: 'For identity and address proof.' },
    { name: 'PAN Card', icon: 'receipt', desc: 'For financial verification.' },
    { name: 'Bank Account', icon: 'store', desc: 'For direct loan disbursement.' },
    { name: 'Land Records', icon: 'chart', desc: 'Proof of agricultural land.' }
  ]

  return (
    <div className="page-container">
      <section className="hero loan-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge"><span></span> QUICK DISBURSEMENT</div>
            <h1>Get an Agriculture Loan <br/>in <em>5 Minutes.</em></h1>
            <p>We provide instant loans to farmers ranging from <strong>₹10,000</strong> to <strong>₹5,00,000</strong> with minimal paperwork and 100% digital process.</p>
            <div className="hero-actions">
              <Link className="button" to="/apply-loan">Apply Loan Now <Icon name="arrow" size={18}/></Link>
              <Link className="button button-ghost" to="/emi-calculator">Calculate EMI</Link>
            </div>
            <div className="hero-proof">
              <Icon name="check" />
              <span><strong>100% Digital KYC</strong><br/>Fast, secure & transparent</span>
            </div>
          </div>
          <div className="loan-hero-visual">
             <div className="amount-card">
               <small>Eligible Amount up to</small>
               <h3>₹5,00,000</h3>
               <Link className="button button-sm button-full mt-2" to="/apply-loan">Apply Now</Link>
             </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <SectionHeader 
            eyebrow="DIGITAL KYC" 
            title={<>Everything you need is <span className="accent">in your pocket.</span></>} 
            copy="Forget long lines at the bank. Complete your verification digitally using these 4 basic documents."
            center
          />
          <div className="kyc-grid">
            {kycDocs.map((doc, i) => (
              <div className="kyc-card" key={doc.name}>
                <div className="kyc-icon"><Icon name={doc.icon} size={32} /></div>
                <h4>{doc.name}</h4>
                <p>{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
