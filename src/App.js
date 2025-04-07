"use client"

import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { LeadDialog } from "./components/LeadDialog"
import { LeadForm } from "./components/LeadForm"
import { DeleteConfirmation } from "./components/DeleteConfirmation"
import { LeadProvider, useLeadContext } from "./context/LeadContext"
import "./App.css"

// Main content component
function LeadManagement() {
    const { leads, isLoading, isUsingMockData, fetchLeads, addLead, deleteLead } = useLeadContext()

    const [selectedLead, setSelectedLead] = useState(null)
    const [viewDialogOpen, setViewDialogOpen] = useState(false)
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [leadToDelete, setLeadToDelete] = useState(null)

    const handleViewLead = (lead) => {
        setSelectedLead(lead)
        setViewDialogOpen(true)
    }

    const handleDeleteClick = (id) => {
        setLeadToDelete(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (leadToDelete) {
            const result = await deleteLead(leadToDelete)
            if (result.success) {
                alert(result.message)
            } else {
                alert(result.message)
            }
            setDeleteDialogOpen(false)
            setLeadToDelete(null)
        }
    }

    const handleAddLead = async (newLead) => {
        const result = await addLead(newLead)
        if (result.success) {
            alert(result.message)
        } else {
            alert(result.message)
        }
        setAddDialogOpen(false)
    }

    return (
        <main className="main-content">
            <div className="header">
                <div>
                    <h1 className="title">OnTime Lead Management</h1>
                    {isUsingMockData && <p className="demo-indicator">Using demo data. API connection unavailable.</p>}
                </div>
                <div className="header-buttons">
                    <button className="button outline" onClick={fetchLeads} disabled={isLoading}>
                        <span className={`icon ${isLoading ? "spin" : ""}`}>↻</span>
                        Refresh
                    </button>
                    <button className="button primary" onClick={() => setAddDialogOpen(true)}>
                        <span className="icon">+</span> Add Lead
                    </button>
                </div>
            </div>

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
                    {isLoading ? (
                        <tr>
                            <td colSpan={5} className="loading-cell">
                                <div className="loading-indicator">
                                    <span className="spin">↻</span>
                                    <p>Loading leads...</p>
                                </div>
                            </td>
                        </tr>
                    ) : leads.length > 0 ? (
                        leads.map((lead) => (
                            <tr key={lead.id}>
                                <td className="name-cell">{lead.fullName}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.companyName}</td>
                                <td className="actions-cell">
                                    <div className="actions-buttons">
                                        <button className="button icon-button" onClick={() => handleViewLead(lead)} title="View lead">
                                            👁️
                                        </button>
                                        <button
                                            className="button icon-button delete"
                                            onClick={() => handleDeleteClick(lead.id)}
                                            title="Delete lead"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="empty-message">
                                No leads found. Add your first lead to get started.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <LeadDialog lead={selectedLead} open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} />

            <LeadForm open={addDialogOpen} onClose={() => setAddDialogOpen(false)} onSave={handleAddLead} />

            <DeleteConfirmation
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </main>
    )
}

// Main App component
function App() {
    return (
        <LeadProvider>
            <div className="app-container">
                <Sidebar />
                <LeadManagement />
            </div>
        </LeadProvider>
    )
}

export default App

