

import { createContext, useContext } from "react"
import { useLeads } from "../hooks/useLeads"

// Create context
const LeadContext = createContext(null)

// Provider component
export function LeadProvider({ children }) {
  const leadsData = useLeads()

  return <LeadContext.Provider value={leadsData}>{children}</LeadContext.Provider>
}

// Hook to use the lead context
export function useLeadContext() {
  const context = useContext(LeadContext)
  if (context === null) {
    throw new Error("useLeadContext must be used within a LeadProvider")
  }
  return context
}

