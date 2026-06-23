import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function MerchantDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'merchant') {
        navigate('/dashboard'); // Not a merchant, go to farmer dashboard
        return;
      }
      setUser(parsedUser);
      fetchProducts(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const res = await fetch('/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        setNewProduct({ name: '', price: '', stock: '' });
        fetchProducts(token);
      }
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts(token);
      }
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  if (!user) return null;

  return (
    <div className="page-container bg-light" style={{ minHeight: '80vh' }}>
      <div className="container py-5">
        <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h1 style={{ fontSize: '28px', color: '#163a2a', marginBottom: '5px' }}>Merchant Dashboard</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Manage your inventory and sales.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>
                {user.name.charAt(0)}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#1e293b' }}>{user.name}</strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Merchant</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            
            {/* Left: Add Product Form */}
            <div>
              <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon name="shopping-bag" size={20} /> Add New Product
                </h3>
                <form onSubmit={handleAddProduct}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Product Name</label>
                    <input 
                      type="text" 
                      value={newProduct.name} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
                      required 
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Price (₹)</label>
                    <input 
                      type="number" 
                      value={newProduct.price} 
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
                      required 
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px' }}>Stock Quantity</label>
                    <input 
                      type="number" 
                      value={newProduct.stock} 
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})} 
                      required 
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                    />
                  </div>
                  <button type="submit" className="button" style={{ width: '100%' }}>Add to Inventory</button>
                </form>
              </div>
            </div>

            {/* Right: Products List */}
            <div>
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Your Inventory</h3>
                  <span style={{ background: '#e2e8f0', color: '#475569', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{products.length} Items</span>
                </div>
                
                {products.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <Icon name="inbox" size={48} />
                    <h4 style={{ fontSize: '18px', color: '#1e293b', marginTop: '15px' }}>No products yet</h4>
                    <p style={{ color: '#64748b' }}>Use the form on the left to add your first product.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                          <th style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0' }}>Product Name</th>
                          <th style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0' }}>Price</th>
                          <th style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0' }}>Stock</th>
                          <th style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '16px 20px', fontWeight: 600, color: '#1e293b' }}>{p.name}</td>
                            <td style={{ padding: '16px 20px', color: '#059669', fontWeight: 700 }}>₹{p.price}</td>
                            <td style={{ padding: '16px 20px' }}>
                              <span style={{ display: 'inline-block', padding: '4px 8px', background: p.stock > 10 ? '#dcfce7' : '#fef3c7', color: p.stock > 10 ? '#166534' : '#92400e', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                                {p.stock} units
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                              <button 
                                onClick={() => handleDeleteProduct(p._id)}
                                style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
