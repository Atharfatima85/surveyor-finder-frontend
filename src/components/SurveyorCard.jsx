import { FiClock, FiMapPin, FiNavigation, FiPhone } from 'react-icons/fi';

function formatDistance(distanceText) {
  if (!distanceText) return null;
  return `${distanceText} away`;
}

function formatDuration(durationText) {
  if (!durationText) return null;
  return `${durationText} by road`;
}

function SurveyorCard({ surveyor, isNearest }) {
  const {
    name,
    phone,
    address,
    areas = [],
    isAvailable,
    distanceText,
    durationText,
  } = surveyor;

  const distance = formatDistance(distanceText);
  const duration = formatDuration(durationText);
  const telHref = `tel:${String(phone).replace(/\s/g, '')}`;

  return (
    <article className={`surveyor-card${isNearest ? ' nearest' : ''}`}>
      <div className="card-top">
        <h3>{name}</h3>
        <div className="card-badges">
          {isNearest && <span className="nearest-badge">⭐ Nearest</span>}
          <span className={`status ${isAvailable ? 'available' : 'unavailable'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <a className="card-phone" href={telHref}>
        <FiPhone aria-hidden="true" />
        {phone}
      </a>

      <p className="card-address">
        <FiMapPin aria-hidden="true" />
        {address}
      </p>

      {distance && (
        <p className="card-metric">
          <FiNavigation aria-hidden="true" />
          {distance}
        </p>
      )}

      {duration && (
        <p className="card-metric">
          <FiClock aria-hidden="true" />
          {duration}
        </p>
      )}

      {areas.length > 0 && (
        <ul className="card-areas">
          {areas.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default SurveyorCard;
