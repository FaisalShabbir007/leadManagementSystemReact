// API utility functions

// API base URL - can be configured via environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    throw new Error(`Server responded with status: ${response.status}. ${errorText}`)
  }

  // Check if the response has content
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }

  return null
}

// Get all leads
export const getLeads = async () => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return handleResponse(response)
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.")
    }
    throw error
  }
}

// Create a new lead
export const createLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  })

  return handleResponse(response)
}

// Delete a lead
export const deleteLead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "DELETE",
  })

  return handleResponse(response)
}

// Update a lead
export const updateLead = async (id, leadData) => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leadData),
  })

  return handleResponse(response)
}

