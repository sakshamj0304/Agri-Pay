import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import SectionHeader from '../components/SectionHeader'
import { Icon } from '../components/Icons'

export default function EMICalculator() {
  const [amount, setAmount] = useState(50000)
  const [interest, setInterest] = useState(8)
  const [tenure, setTenure] = useState(12)

  // EMI Calculation Formula: P * R * (1+R)^N / [(1+R)^N-1]
  // P = Principal amount
  // R = Monthly interest rate (Annual Rate / 12 / 100)
  // N = Number of months (Tenure)
  
  const calculateEMI = () => {
    const P = amount
    const R = interest / 12 / 100
    const N = tenure
    if (R === 0) return P / N
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
    return Math.round(emi)
  }

  const emiResult = calculateEMI()
  const totalPayment = emiResult * tenure
  const totalInterest = totalPayment - amount

  const data = [
    { name: 'Principal Amount', value: amount, color: '#059669' },
    { name: 'Total Interest', value: totalInterest, color: '#d9f26a' }
  ];

  return (
    <div className="page-container">
      <section className="section bg-light">
        <div className="container">
          <SectionHeader 
            eyebrow="FINANCIAL PLANNING" 
            title={<>Calculate your <span className="accent">EMI Result</span></>} 
            copy="Plan your finances easily. Adjust the loan amount, interest rate, and tenure to see your estimated monthly installment."
            center 
          />
          
          <div className="calculator-wrapper">
            <div className="calculator-controls">
              <div className="control-group">
                <label>
                  <span>Loan Amount (₹)</span>
                  <strong>₹{amount.toLocaleString('en-IN')}</strong>
                </label>
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div className="range-labels">
                  <small>₹10,000</small>
                  <small>₹5,00,000</small>
                </div>
              </div>

              <div className="control-group">
                <label>
                  <span>Interest Rate (% p.a.)</span>
                  <strong>{interest}%</strong>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="24" 
                  step="0.5" 
                  value={interest} 
                  onChange={(e) => setInterest(Number(e.target.value))}
                />
                <div className="range-labels">
                  <small>5%</small>
                  <small>24%</small>
                </div>
              </div>

              <div className="control-group">
                <label>
                  <span>Tenure (Months)</span>
                  <strong>{tenure} Months</strong>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="60" 
                  step="1" 
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <div className="range-labels">
                  <small>3</small>
                  <small>60</small>
                </div>
              </div>
            </div>
            
            <div className="calculator-results">
              <div className="result-card">
                <h3>Monthly EMI</h3>
                <div className="emi-amount">₹{emiResult.toLocaleString('en-IN')}</div>
                <div className="result-breakdown" style={{ marginTop: '30px' }}>
                  
                  {/* Recharts Donut Chart */}
                  <div style={{ width: '100%', height: '220px', marginBottom: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="breakdown-item">
                    <span><span style={{display:'inline-block', width:'10px',height:'10px',background:'#059669',borderRadius:'50%',marginRight:'8px'}}></span>Principal Amount</span>
                    <strong>₹{amount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span><span style={{display:'inline-block', width:'10px',height:'10px',background:'#d9f26a',borderRadius:'50%',marginRight:'8px'}}></span>Total Interest</span>
                    <strong>₹{totalInterest.toLocaleString('en-IN')}</strong>
                  </div>
                  <hr/>
                  <div className="breakdown-item total" style={{ fontSize: '18px', marginTop: '15px' }}>
                    <span>Total Payment</span>
                    <strong style={{ color: '#163a2a' }}>₹{totalPayment.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
                <button className="button button-full mt-4">Apply for Loan <Icon name="arrow"/></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
