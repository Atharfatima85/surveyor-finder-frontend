function Sidebar({
  surveyors,
  loading,
  selectedId,
  onSelect,
  onAdd,
  onView,
  onEdit,
  onDelete,
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
        {surveyors.map((surveyor) => (
          <article
            key={surveyor._id}
            className={`sidebar-item${selectedId === surveyor._id ? ' selected' : ''}`}
            onClick={() => onSelect(surveyor._id)}
          >
            <h3>{surveyor.name}</h3>
            <p className="sidebar-phone">{surveyor.phone}</p>
            <div className="sidebar-actions">
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
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
