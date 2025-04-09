
import { useLeadContext } from "../context/LeadContext"
import { LeadTable } from "../components/LeadTable"

export function Dashboard() {
  const { leads, isLoading, error, isUsingMockData, fetchLeads } = useLeadContext()

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        {isUsingMockData && <div className="demo-badge">Demo Mode</div>}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Leads</h3>
          <p className="stat-value">{leads.length}</p>
        </div>
        <div className="stat-card">
          <h3>New This Week</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <p className="stat-value">0%</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section-header">
          <h2>Recent Leads</h2>
          <button className="button outline" onClick={fetchLeads}>
            Refresh
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <LeadTable leads={leads.slice(0, 5)} isLoading={isLoading} onView={() => {}} onDelete={() => {}} />

        {leads.length > 5 && (
          <div className="view-all-link">
            <a href="/leads">View all leads</a>
          </div>
        )}
      </div>
    </div>
  )
}

