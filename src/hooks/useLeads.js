

import { useState, useEffect, useCallback } from "react"
import { mockLeads } from "../lib/data"

// Custom hook to manage leads data and operations
export function useLeads() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  // API base URL - can be configured via environment variable
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

  const fetchLeads = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Try to fetch from the API
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      setLeads(data)
      setIsUsingMockData(false)
    } catch (error) {
      console.error("Error fetching leads:", error)
      setError(error.message)

      // If we're in development or preview mode, use mock data
      if (process.env.NODE_ENV !== "production") {
        console.log("Using mock data instead")
        setLeads(mockLeads)
        setIsUsingMockData(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [API_BASE_URL])

  const addLead = useCallback(
    async (newLead) => {
      if (isUsingMockData) {
        // If using mock data, just add to the local state
        const mockId = Date.now().toString()
        const newMockLead = {
          id: mockId,
          ...newLead,
        }
        setLeads((prev) => [...prev, newMockLead])
        return { success: true, message: "Lead added to demo data" }
      }

      try {
        const response = await fetch(`${API_BASE_URL}/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLead),
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        // Refresh the leads list
        await fetchLeads()

        return { success: true, message: "Lead added successfully" }
      } catch (error) {
        console.error("Error adding lead:", error)
        return { success: false, message: "Failed to add lead. Please try again." }
      }
    },
    [API_BASE_URL, fetchLeads, isUsingMockData],
  )

  const deleteLead = useCallback(
    async (id) => {
      if (isUsingMockData) {
        // If using mock data, just remove from the local state
        setLeads((prev) => prev.filter((lead) => lead.id !== id))
        return { success: true, message: "Lead deleted from demo data" }
      }

      try {
        const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        // Refresh the leads list
        await fetchLeads()

        return { success: true, message: "Lead deleted successfully" }
      } catch (error) {
        console.error("Error deleting lead:", error)
        return { success: false, message: "Failed to delete lead. Please try again." }
      }
    },
    [API_BASE_URL, fetchLeads, isUsingMockData],
  )

  // Load leads on mount
  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  return {
    leads,
    isLoading,
    error,
    isUsingMockData,
    fetchLeads,
    addLead,
    deleteLead,
  }
}

