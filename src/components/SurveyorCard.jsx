function parseDistance(distanceText) {
  if (!distanceText) return { value: '—', unit: 'miles' };
  const parts = distanceText.trim().split(' ');
  return {
    value: parts[0] || '—',
    unit: parts[1] || 'miles',
  };
}

function extractPostcodeFromAddress(addr) {
  if (!addr) return '';
  const match = addr.match(/\b([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})\b/i);
  return match ? match[1].toUpperCase() : '';
}

function SurveyorCard({ surveyor, isNearest, onSelect }) {
  const {
    name,
    address,
    isAvailable,
    distanceText,
    durationText,
    postcode,
    searchPostcode,
  } = surveyor;

  const dist = parseDistance(distanceText);
  const surveyorPostcode = postcode || extractPostcodeFromAddress(address);

  return (
    <article
      className={`surveyor-card${isNearest ? ' nearest' : ''}`}
      onClick={onSelect}
    >
      <div className="card-layout">
        {/* Left Side: Badges, Name, and Postcode Journey Box underneath Name */}
        <div className="card-main-col">
          <div className="card-badges-inline">
            {isNearest && <span className="nearest-badge">⭐ Nearest</span>}
            <span className={`status ${isAvailable ? 'available' : 'unavailable'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <h3 className="card-surveyor-name">{name}</h3>

          {/* Postcodes Distance Comparison Box directly under name */}
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

        {/* Right Side: Animated Rotating Green Circle */}
        <div className="card-side-col">
          <div className="rotating-circle-wrapper" title={`Distance: ${distanceText || 'Calculating'}`}>
            <div className="spinning-outer-ring" aria-hidden="true" />
            <div className="circle-inner-core">
              <span className="circle-dist-val">{dist.value}</span>
              <span className="circle-dist-unit">{dist.unit}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SurveyorCard;
