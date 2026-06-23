import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from './Icons'

export default function ContactForm() {
  const [params] = useSearchParams()
  const [sent, setSent] = useState(false)
  const defaultType = params.get('type') === 'merchant' ? 'Merchant / Retailer' : ''
  async function submit(e) { 
    e.preventDefault(); 
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      type: formData.get('type'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSent(true); 
        e.target.reset(); 
      } else {
        alert('Failed to send enquiry. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    }
  }
  if (sent) return <div className="success-card"><span><Icon name="check" size={32}/></span><h3>Thank you — we're on it.</h3><p>Our team will reach out within 1–2 business days.</p><button className="text-link" onClick={() => setSent(false)}>Send another message</button></div>
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Full name<input name="name" placeholder="Your name" required /></label><label>Work email<input type="email" name="email" placeholder="you@company.com" required /></label></div>
    <div className="form-row"><label>Phone number<input type="tel" name="phone" placeholder="+91 98765 43210" required /></label><label>Business type<select name="type" defaultValue={defaultType} required><option value="" disabled>Select one</option><option>Merchant / Retailer</option><option>Bank / NBFC</option><option>Investor</option><option>Technology Partner</option><option>Other</option></select></label></div>
    <label>How can we help?<textarea name="message" rows="5" placeholder="Tell us about your business or partnership idea..." required /></label>
    <button className="button" type="submit">Send enquiry <Icon name="arrow" size={18}/></button>
  </form>
}
