import ContactForm from '../components/ContactForm'
import { Icon } from '../components/Icons'

export default function Contact() {
  return <section className="contact-page"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow lime">LET'S TALK</span><h1>Good ideas begin<br/>with a <em>conversation.</em></h1><p>Whether you're a merchant, financing partner, investor or technology provider, we'd love to hear what you're building.</p><div className="contact-details"><div><span><Icon name="mail"/></span><p><small>EMAIL US</small><a href="mailto:sahajjain316@gmail.com">sahajjain316@gmail.com</a></p></div><div><span><Icon name="phone"/></span><p><small>CALL US</small><a href="tel:8982885204">8982885204</a></p></div></div><div className="contact-note"><Icon name="leaf"/><span>Every message is read by a member of our founding team.</span></div></div><div className="form-wrap"><span className="eyebrow">TELL US ABOUT YOURSELF</span><h2>How can we help?</h2><ContactForm /></div></div></section>
}
