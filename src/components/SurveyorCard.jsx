import { FiMapPin, FiPhone } from 'react-icons/fi';

function formatDistance(distanceText) {
  if (!distanceText) return null;
  return distanceText.toLowerCase().includes('away')
    ? distanceText
    : `${distanceText} away`;
}

function formatDuration(durationText) {
  if (!durationText) return null;
  return durationText.toLowerCase().includes('by road')
    ? durationText
    : `${durationText} by road`;
}

function SurveyorCard({ surveyor, isNearest, onSelect }) {
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
    <article
      className={`surveyor-card${isNearest ? ' nearest' : ''}`}
      onClick={onSelect}
    >
      <div className="card-badges">
        {isNearest && <span className="nearest-badge">⭐ Nearest</span>}
        <span className={`status ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {distance && <p className="card-distance">{distance}</p>}
      {duration && <p className="card-duration">{duration}</p>}

      <h3>{name}</h3>

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
        {address}
      </p>

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
