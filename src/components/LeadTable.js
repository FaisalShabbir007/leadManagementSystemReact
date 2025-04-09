export function LeadTable({ leads, isLoading, onView, onDelete }) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading leads...</p>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <p>No leads found. Add your first lead to get started.</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="name-cell">{lead.fullName}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.companyName}</td>
              <td className="actions-cell">
                <div className="actions-buttons">
                  <button className="button icon-button" onClick={() => onView(lead)} title="View lead">
                    👁️
                  </button>
                  <button className="button icon-button delete" onClick={() => onDelete(lead.id)} title="Delete lead">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

