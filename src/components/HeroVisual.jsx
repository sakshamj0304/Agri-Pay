import { Icon } from './Icons'

export default function HeroVisual() {
  return <div className="hero-visual" aria-label="AgriPay checkout flow illustration">
    <div className="sun-orb"></div><div className="grid-lines"></div>
    <div className="flow-card farmer-card"><span className="flow-icon warm"><Icon name="users"/></span><div><small>01</small><strong>Farmer</strong><span>Needs farm inputs</span></div></div>
    <div className="flow-card merchant-card"><span className="flow-icon"><Icon name="store"/></span><div><small>02</small><strong>Merchant</strong><span>Starts checkout</span></div></div>
    <div className="flow-card partner-card"><span className="flow-icon dark"><Icon name="shield"/></span><div><small>04</small><strong>Finance Partner</strong><span>Enables credit</span></div></div>
    <div className="agripay-core"><span className="core-leaf"><Icon name="leaf" size={28}/></span><strong>AgriPay</strong><small>VERIFIED CHECKOUT</small><div className="core-status"><i></i> Approved in minutes</div></div>
    <svg className="flow-paths" viewBox="0 0 640 520" fill="none"><path d="M105 158C176 158 177 230 245 230"/><path d="M527 146C464 146 464 224 396 224"/><path d="M317 337v70c0 37 56 30 107 30"/></svg>
    <div className="mini-pill secure"><Icon name="lock" size={15}/> Consent-led</div><div className="mini-pill digital"><Icon name="zap" size={15}/> Fully digital</div>
  </div>
}
