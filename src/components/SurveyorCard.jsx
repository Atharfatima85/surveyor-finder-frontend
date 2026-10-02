import { FiMapPin, FiPhone, FiCalendar, FiClock } from 'react-icons/fi';

const SLOT_ICONS = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌙',
};

function parseDistance(distanceText) {
  if (!distanceText) return { value: '—', unit: 'miles' };
  const parts = distanceText.trim().split(' ');
  return {
    value: parts[0] || '—',
    unit: parts[1] || 'miles',
  };
}

function formatDaysSummary(days = []) {
  if (!days || days.length === 0) return 'Flexible / On request';
  if (days.length === 7) return 'All 7 Days (Mon - Sun)';
  if (
    days.length === 5 &&
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].every((d) =>
      days.includes(d)
    )
  ) {
    return 'Mon - Fri (5 days/wk)';
  }
  if (
    days.length === 2 &&
    days.includes('Saturday') &&
    days.includes('Sunday')
  ) {
    return 'Weekends only (Sat - Sun)';
  }
  return `${days.length} days: ${days.map((d) => d.slice(0, 3)).join(', ')}`;
}

function extractPostcodeFromAddress(addr) {
  if (!addr) return '';
  const match = addr.match(/\b([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})\b/i);
  return match ? match[1].toUpperCase() : '';
}

function SurveyorCard({ surveyor, isNearest, onSelect }) {
  const {
    name,
    phone,
    address,
    isAvailable,
    availableDays = [],
    timeSlots = [],
    distanceText,
    durationText,
    postcode,
    searchPostcode,
  } = surveyor;

  const dist = parseDistance(distanceText);
  const surveyorPostcode = postcode || extractPostcodeFromAddress(address);
  const telHref = `tel:${String(phone).replace(/\s/g, '')}`;

  return (
    <article
      className={`surveyor-card${isNearest ? ' nearest' : ''}`}
      onClick={onSelect}
    >
      <div className="card-layout">
        {/* Left Side: Animated Rotating Green Circle & Postcode Route */}
        <div className="card-left-col">
          <div className="rotating-circle-wrapper" title={`Distance: ${distanceText || 'Calculating'}`}>
            <div className="spinning-outer-ring" aria-hidden="true" />
            <div className="circle-inner-core">
              <span className="circle-dist-val">{dist.value}</span>
              <span className="circle-dist-unit">{dist.unit}</span>
            </div>
          </div>

          {/* Postcodes Distance Comparison Box */}
          <div className="postcode-comparison-box">
            {searchPostcode && (
              <div className="postcode-step search-step" title={`Searched: ${searchPostcode}`}>
                <span className="postcode-tag-label">SEARCH</span>
                <span className="postcode-tag-code">{searchPostcode}</span>
              </div>
            )}

            <div className="postcode-arrow-divider">
              <span className="postcode-arrow-icon">➔</span>
              {durationText && (
                <span className="postcode-duration-badge">{durationText}</span>
              )}
            </div>

            {surveyorPostcode && (
              <div className="postcode-step surveyor-step" title={`Surveyor: ${surveyorPostcode}`}>
                <span className="postcode-tag-label">SURVEYOR</span>
                <span className="postcode-tag-code">{surveyorPostcode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Surveyor Details */}
        <div className="card-right-col">
          <div className="card-badges-inline">
            {isNearest && <span className="nearest-badge">⭐ Nearest</span>}
            <span className={`status ${isAvailable ? 'available' : 'unavailable'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <h3 className="card-surveyor-name">{name}</h3>

          <a
            className="card-phone"
            href={telHref}
            onClick={(event) => event.stopPropagation()}
          >
            <FiPhone aria-hidden="true" />
            {phone}
          </a>

          <p className="card-address">
            <FiMapPin aria-hidden="true" />
            <span>{address}</span>
          </p>

          <div className="card-schedule-info">
            <div className="card-schedule-row" title={`Available: ${availableDays.join(', ')}`}>
              <FiCalendar className="schedule-icon" aria-hidden="true" />
              <span className="schedule-text">{formatDaysSummary(availableDays)}</span>
            </div>

            {timeSlots.length > 0 && (
              <div className="card-schedule-row">
                <FiClock className="schedule-icon" aria-hidden="true" />
                <div className="card-slot-pills">
                  {timeSlots.map((slot) => (
                    <span key={slot} className="card-slot-badge">
                      {SLOT_ICONS[slot] || ''} {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default SurveyorCard;
