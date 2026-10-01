const SLOT_ICONS = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌙',
};

function ViewSurveyorModal({ surveyor, onClose }) {
  const areas = Array.isArray(surveyor.areas) ? surveyor.areas : [];
  const days = Array.isArray(surveyor.availableDays) ? surveyor.availableDays : [];
  const slots = Array.isArray(surveyor.timeSlots) ? surveyor.timeSlots : [];

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
          {surveyor.postcode && (
            <div>
              <dt>Postcode</dt>
              <dd>
                <span className="day-chip">{surveyor.postcode}</span>
              </dd>
            </div>
          )}
          <div>
            <dt>Status</dt>
            <dd>
              <span className={`status ${surveyor.isAvailable ? 'available' : 'unavailable'}`}>
                {surveyor.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </dd>
          </div>
          <div>
            <dt>Working Days ({days.length} days/week)</dt>
            <dd>
              {days.length > 0 ? (
                <div className="days-chip-list">
                  {days.map((day) => (
                    <span key={day} className="day-chip">
                      {day}
                    </span>
                  ))}
                </div>
              ) : (
                'No specific days listed'
              )}
            </dd>
          </div>
          <div>
            <dt>Available Shifts / Timing</dt>
            <dd>
              {slots.length > 0 ? (
                <div className="slots-chip-list">
                  {slots.map((slot) => (
                    <span key={slot} className="slot-chip">
                      {SLOT_ICONS[slot] || '⏱️'} {slot}
                    </span>
                  ))}
                </div>
              ) : (
                'Flexible / Not specified'
              )}
            </dd>
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
