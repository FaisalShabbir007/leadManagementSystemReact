"use client"

export function DeleteConfirmation({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure?</h2>
        <p>This action cannot be undone. This will permanently delete the lead from your database.</p>
        <div className="dialog-buttons">
          <button className="button outline" onClick={onClose}>
            Cancel
          </button>
          <button className="button delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

