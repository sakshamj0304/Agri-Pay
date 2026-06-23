import SectionHeader from '../components/SectionHeader'

export default function KYC() {
  return (
    <div className="page-container bg-light">
      <div className="container py-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <SectionHeader eyebrow="VERIFICATION" center title="Digital KYC Verification" copy="Please upload your documents to verify your identity." />
        <form className="auth-form mt-4" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label>Aadhaar Number</label>
            <input type="text" placeholder="Enter 12-digit Aadhaar" />
          </div>
          <div className="form-group">
            <label>PAN Card</label>
            <input type="text" placeholder="Enter PAN Number" />
          </div>
          <div className="form-group">
            <label>Upload Land Records</label>
            <input type="file" />
          </div>
          <button className="button button-full mt-3">Submit for Verification</button>
        </form>
      </div>
    </div>
  )
}
