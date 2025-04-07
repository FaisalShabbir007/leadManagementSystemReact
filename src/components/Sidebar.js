export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Lead Manager</h1>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item active">
            <a href="/" className="sidebar-link">
              <span className="sidebar-icon">👥</span>
              <span>Leads</span>
            </a>
          </li>
          <li className="sidebar-menu-item">
            <a href="/analytics" className="sidebar-link">
              <span className="sidebar-icon">📊</span>
              <span>Analytics</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

