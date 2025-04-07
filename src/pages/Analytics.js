import { useLeadContext } from "../context/LeadContext"

export function Analytics() {
  const { leads, isUsingMockData } = useLeadContext()

  // Calculate some basic analytics
  const totalLeads = leads.length
  const companyCounts = leads.reduce((acc, lead) => {
    acc[lead.companyName] = (acc[lead.companyName] || 0) + 1
    return acc
  }, {})

  // Sort companies by lead count
  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics</h1>
        {isUsingMockData && <div className="demo-badge">Demo Mode</div>}
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Leads</h3>
          <p className="summary-value">{totalLeads}</p>
        </div>
        <div className="summary-card">
          <h3>Unique Companies</h3>
          <p className="summary-value">{Object.keys(companyCounts).length}</p>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Top Companies</h2>
        {topCompanies.length > 0 ? (
          <div className="companies-list">
            {topCompanies.map(([company, count]) => (
              <div key={company} className="company-item">
                <span className="company-name">{company}</span>
                <span className="company-count">{count} leads</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">No company data available</p>
        )}
      </div>

      <div className="analytics-section">
        <h2>Lead Growth</h2>
        <div className="chart-placeholder">
          <p>Chart visualization coming soon</p>
        </div>
      </div>
    </div>
  )
}

