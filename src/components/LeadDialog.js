export function LeadDialog({ lead, open, onClose }) {
  if (!open || !lead) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Lead Details</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="lead-detail">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{lead.fullName}</span>
          </div>
          <div className="lead-detail">
            <span className="detail-label">Company:</span>
            <span className="detail-value">{lead.companyName}</span>
          </div>
          <div className="lead-detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{lead.email}</span>
          </div>
          <div className="lead-detail">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{lead.phone}</span>
          </div>
          <div className="lead-detail">
            <span className="detail-label">Notes:</span>
            <span className="detail-value">{lead.notes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

