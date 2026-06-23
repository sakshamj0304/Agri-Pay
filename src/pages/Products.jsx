import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

const productsData = [
  {
    emoji: '🌾',
    title: 'Agri Checkout',
    desc: 'Seamless payments for all agricultural inputs.',
    items: ['Fertilizer purchase checkout', 'Seed purchase checkout', 'Pesticide purchase checkout', 'Farm equipment checkout', 'Digital invoice generation', 'UPI & QR payments']
  },
  {
    emoji: '💳',
    title: 'Farmer Credit (BNPL)',
    desc: 'Instant credit exactly when farmers need it.',
    items: ['Buy Now Pay Later for farmers', 'Input credit for seeds and fertilizers', 'Flexible repayment after harvest', 'Credit score based on purchase history']
  },
  {
    emoji: '📊',
    title: 'Farmer Ledger (Khata)',
    desc: 'Keep track of all your udhaar digitally.',
    items: ['Digital udhaar book', 'Transaction history', 'Due date reminders', 'WhatsApp payment reminders']
  },
  {
    emoji: '🏪',
    title: 'Agri Retailer Dashboard',
    desc: 'Complete toolkit for agricultural merchants.',
    items: ['Stock management', 'Billing system', 'Customer management', 'Credit tracking', 'Sales analytics']
  },
  {
    emoji: '🚜',
    title: 'Equipment Financing',
    desc: 'Loans for heavy machinery made easy.',
    items: ['Tractor financing', 'Irrigation equipment financing', 'Farm machinery loans', 'EMI tracking']
  },
  {
    emoji: '🌦️',
    title: 'Farm Intelligence',
    desc: 'Data-driven insights to maximize yield.',
    items: ['Weather alerts', 'Crop advisory', 'Pest & disease alerts', 'Market price updates']
  },
  {
    emoji: '📈',
    title: 'Agri Analytics',
    desc: 'Deep analytics for businesses and partners.',
    items: ['Farmer purchase behavior', 'Retailer sales trends', 'Credit performance', 'Inventory forecasting']
  },
  {
    emoji: '🤝',
    title: 'Marketplace',
    desc: 'Connect directly with buyers and sellers.',
    items: ['Seeds', 'Fertilizers', 'Pesticides', 'Farm equipment', 'Direct farmer-retailer transactions']
  }
];

export default function Products() {
  return (
    <div className="page-container" style={{ background: '#fffdf8', minHeight: '100vh', padding: '80px 0' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 70px' }}>
          <span className="eyebrow lime" style={{ color: '#69843c', marginBottom: '15px' }}>OUR FUTURE PLANS</span>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#163a2a', marginBottom: '20px', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Upcoming Solutions<br/>for Rural India
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.6 }}>
            In the near future, you will see all these amazing products rolling out on our platform. We are building a complete suite of financial and operational tools for farmers and agri-retailers.
          </p>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {productsData.map((product, index) => (
            <div key={index} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <span style={{ fontSize: '32px', background: '#f1f5f9', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}>
                  {product.emoji}
                </span>
                <h3 style={{ fontSize: '22px', color: '#163a2a', margin: 0 }}>{product.title}</h3>
              </div>
              
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px', lineHeight: 1.5 }}>
                {product.desc}
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {product.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 0', borderTop: i !== 0 ? '1px solid #f1f5f9' : 'none', fontSize: '14px', color: '#475569', fontWeight: 600 }}>
                    <span style={{ color: '#6c8f39', marginTop: '2px' }}><Icon name="check" size={14} /></span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Small Coming Soon Badge */}
              <div style={{ position: 'absolute', top: '25px', right: '-35px', background: '#fef3c7', color: '#d97706', fontSize: '10px', fontWeight: 800, padding: '5px 40px', transform: 'rotate(45deg)', letterSpacing: '1px' }}>
                COMING SOON
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '80px', padding: '50px', background: '#163a2a', borderRadius: '24px', color: 'white' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Want early access?</h2>
          <p style={{ color: '#b9c7bf', marginBottom: '30px' }}>Join the waitlist to be the first to experience our new products.</p>
          <Link to="/contact" className="button" style={{ background: '#d9f26a', color: '#163a2a', fontSize: '16px', padding: '16px 32px' }}>
            Join the Waitlist
          </Link>
        </div>

      </div>
    </div>
  );
}
