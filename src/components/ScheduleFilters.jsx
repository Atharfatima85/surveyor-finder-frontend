import { FiFilter, FiCalendar, FiClock, FiX } from 'react-icons/fi';
import { ALL_DAYS } from '../constants/schedule';

const SHIFT_OPTIONS = [
  { value: 'all', label: 'All Shifts' },
  { value: 'Morning', label: '🌅 Morning' },
  { value: 'Afternoon', label: '☀️ Afternoon' },
  { value: 'Evening', label: '🌙 Evening' },
];

function ScheduleFilters({
  selectedDay,
  onSelectDay,
  selectedShift,
  onSelectShift,
  totalResults = 0,
  filteredCount = 0,
}) {
  const isFiltered = selectedDay !== 'all' || selectedShift !== 'all';

  return (
    <div className="schedule-filter-bar">
      <div className="filter-group">
        <span className="filter-title">
          <FiFilter aria-hidden="true" /> Filter by Availability:
        </span>

        {/* Day Select */}
        <div className="select-wrapper">
          <FiCalendar className="select-icon" aria-hidden="true" />
          <select
            value={selectedDay}
            onChange={(e) => onSelectDay(e.target.value)}
            aria-label="Filter by day"
            className="filter-select"
          >
            <option value="all">Any Day</option>
            {ALL_DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Select */}
        <div className="select-wrapper">
          <FiClock className="select-icon" aria-hidden="true" />
          <select
            value={selectedShift}
            onChange={(e) => onSelectShift(e.target.value)}
            aria-label="Filter by shift"
            className="filter-select"
          >
            {SHIFT_OPTIONS.map((shift) => (
              <option key={shift.value} value={shift.value}>
                {shift.label}
              </option>
            ))}
          </select>
        </div>

        {isFiltered && (
          <button
            type="button"
            className="clear-filters-btn"
            onClick={() => {
              onSelectDay('all');
              onSelectShift('all');
            }}
          >
            <FiX aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      {isFiltered && (
        <span className="filter-match-count">
          Showing {filteredCount} of {totalResults} available
        </span>
      )}
    </div>
  );
}

export default ScheduleFilters;
