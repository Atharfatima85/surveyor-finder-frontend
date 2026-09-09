import SurveyorCard from './SurveyorCard';

function SurveyorList({ surveyors, hasSearched, searchQuery }) {
  if (!hasSearched) {
    return (
      <p className="empty-state">
        Search an area or address to find nearby surveyors.
      </p>
    );
  }

  if (!surveyors.length) {
    return (
      <p className="empty-state">
        No surveyors found near {searchQuery}.
      </p>
    );
  }

  return (
    <section className="surveyor-list" aria-live="polite">
      <p className="results-count">
        Found {surveyors.length} surveyors near {searchQuery}
      </p>
      <div className="card-grid">
        {surveyors.map((surveyor, index) => (
          <SurveyorCard
            key={surveyor._id}
            surveyor={surveyor}
            isNearest={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export default SurveyorList;
