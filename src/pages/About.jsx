import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'

export default function About() {
  return <>
    <section className="page-hero" style={{ paddingBottom: '60px' }}>
      <div className="container">
        <span className="eyebrow">ABOUT US</span>
        <h1>Empowering rural commerce <br/><em>with trust.</em></h1>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '40px', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', color: '#4a5d53', lineHeight: '1.8' }}>
        <p>Hi, I'm <strong>Sahaj Jain</strong>, a B.Sc. Agriculture student and the founder behind AgriPay.</p>
        
        <p>While interacting with farmers, agri-input dealers, and rural merchants, I observed a common challenge: many farmers still rely on informal udhaar to purchase seeds, fertilizers, pesticides, and other essential agricultural products. Although this system has supported rural communities for decades, it often lacks transparency, proper repayment tracking, and access to formal financial services.</p>
        
        <p>This observation inspired the idea behind <strong>AgriPay</strong>.</p>
        
        <p>AgriPay is being built as a merchant-led rural checkout and credit infrastructure platform designed to simplify access to purchase-linked financing. Our goal is to help farmers buy essential products when they need them while enabling merchants to manage credit more efficiently through digital tools.</p>

        <p>We believe that trusted local merchants are the backbone of rural commerce. By combining technology, credit management, and financial partnerships, we aim to transform traditional rural credit into a more transparent, structured, and scalable ecosystem.</p>

        <p>Our vision is to build the default checkout and credit infrastructure for rural India—connecting farmers, merchants, and financial institutions through a simple and accessible platform.</p>

        <p>We are currently in the research and validation stage, working closely with farmers, merchants, and industry experts to understand real-world challenges and build solutions that create meaningful impact.</p>

        <p style={{ fontWeight: '600', color: '#2f6b4b' }}>Together, we hope to make rural commerce more inclusive, efficient, and financially empowered.</p>

        <hr style={{ margin: '60px 0', border: 'none', borderTop: '1px solid #dfe4dd' }} />

        <h3 style={{ fontSize: '24px', color: '#163a2a', marginBottom: '20px', fontWeight: '800' }}>Website Development</h3>
        
        <p>The AgriPay platform and website have been designed and developed by <strong>Saksham Jain</strong>, focusing on creating a modern, secure, and user-friendly digital experience for farmers, merchants, and financial partners. The platform is being built to support the future growth of rural commerce and agricultural finance across India.</p>

      </div>
    </section>

    <section className="cta-band">
      <div className="container">
        <div>
          <span className="eyebrow lime">JOIN THE JOURNEY</span>
          <h2>Help build the rails for rural growth.</h2>
        </div>
        <Link className="button button-light" to="/contact">Talk to us <Icon name="arrow" size={18}/></Link>
      </div>
    </section>
  </>
}
