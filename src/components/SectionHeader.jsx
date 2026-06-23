export default function SectionHeader({ eyebrow, title, copy, center = false }) {
  return <div className={`section-header ${center ? 'center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}
