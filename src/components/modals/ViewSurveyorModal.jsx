function ViewSurveyorModal({ surveyor, onClose }) {
  const areas = Array.isArray(surveyor.areas) ? surveyor.areas : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="view-surveyor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 id="view-surveyor-title">{surveyor.name}</h2>
        <dl className="view-details">
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${String(surveyor.phone).replace(/\s/g, '')}`}>
                {surveyor.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{surveyor.address}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{surveyor.isAvailable ? 'Available' : 'Unavailable'}</dd>
          </div>
          <div>
            <dt>Areas covered</dt>
            <dd>
              {areas.length > 0 ? (
                <ul className="card-areas">
                  {areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              ) : (
                '—'
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ViewSurveyorModal;
