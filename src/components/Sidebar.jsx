function Sidebar({
  surveyors,
  loading,
  selectedId,
  onSelect,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
  open,
  onClose,
}) {
  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <h2>Surveyors</h2>
          <button
            type="button"
            className="sidebar-close-mobile"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <button type="button" className="add-btn" onClick={onAdd}>
          + Add New Surveyor
        </button>
      </div>

      <div className="sidebar-list">
        {loading && <p className="sidebar-status">Loading…</p>}
        {!loading && surveyors.length === 0 && (
          <p className="sidebar-status">No surveyors yet.</p>
        )}
        {surveyors.map((surveyor) => {
          const daysCount = surveyor.availableDays?.length ?? 5;
          const slots = surveyor.timeSlots || [];

          return (
            <article
              key={surveyor._id}
              className={`sidebar-item${selectedId === surveyor._id ? ' selected' : ''}`}
              onClick={() => onSelect(surveyor._id)}
            >
              <div className="sidebar-item-top">
                <h3>{surveyor.name}</h3>
                <span className={`status-dot ${surveyor.isAvailable ? 'available' : 'unavailable'}`} />
              </div>
              <p className="sidebar-phone">{surveyor.phone}</p>
              <div className="sidebar-schedule-badge">
                <span>{daysCount} {daysCount === 1 ? 'day' : 'days'}/wk</span>
                {slots.length > 0 && <span>• {slots.join(', ')}</span>}
              </div>
              <div className="sidebar-actions">
                <button
                  type="button"
                  className={`btn-toggle-status ${surveyor.isAvailable ? 'btn-active' : 'btn-inactive'}`}
                  title={surveyor.isAvailable ? 'Click to deactivate' : 'Click to activate'}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleActive(surveyor);
                  }}
                >
                  {surveyor.isAvailable ? 'Active' : 'Inactive'}
                </button>
                <button
                  type="button"
                  className="btn-view"
                  onClick={(event) => {
                    event.stopPropagation();
                    onView(surveyor);
                  }}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn-edit"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(surveyor);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(surveyor);
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
