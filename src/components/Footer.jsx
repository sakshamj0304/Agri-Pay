import { Link } from 'react-router-dom'
import { Icon } from './Icons'

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-top">
      <div className="footer-brand"><Link className="brand light" to="/"><span className="brand-mark"><Icon name="leaf" size={22}/></span><span>Agri<span>Pay</span></span></Link><p>Building the trusted checkout and credit infrastructure for rural India.</p></div>
      <div><h4>Explore</h4><Link to="/about">About us</Link><Link to="/product">Product</Link><Link to="/partners">Partners</Link></div>
      <div><h4>Connect</h4><Link to="/contact">Request demo</Link><a href="mailto:sahajjain316@gmail.com">sahajjain316@gmail.com</a><a href="tel:8982885204">8982885204</a><span>LinkedIn · X · Instagram</span></div>
      <div className="footer-callout"><span className="eyebrow lime">RURAL INDIA, FORWARD</span><h3>Ready to rethink rural checkout?</h3><Link className="text-link light-link" to="/contact">Start a conversation <Icon name="arrow" size={18}/></Link></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 AgriPay. All rights reserved.</span><span>Made for the people who feed India.</span></div>
  </footer>
}
