// Format phone number to (XXX) XXX-XXXX format
export function formatPhoneNumber(phoneNumber) {
  // Remove all non-numeric characters
  const cleaned = ("" + phoneNumber).replace(/\D/g, "")

  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3]
  }

  return phoneNumber
}

// Validate email format
export function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Generate a unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Format date to locale string
export function formatDate(date) {
  if (!date) return ""

  const dateObj = new Date(date)
  return dateObj.toLocaleDateString()
}

// Debounce function for search inputs
export function debounce(func, wait) {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

