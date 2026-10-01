import { ALL_DAYS, ALL_SLOTS } from '../../constants/schedule';

function SchedulePicker({
  selectedDays = [],
  onChangeDays,
  selectedSlots = [],
  onChangeSlots,
}) {
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChangeDays(selectedDays.filter((d) => d !== day));
    } else {
      onChangeDays([...selectedDays, day]);
    }
  };

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      onChangeSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      onChangeSlots([...selectedSlots, slot]);
    }
  };

  const selectWeekdays = () => {
    onChangeDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  };

  const selectWeekends = () => {
    onChangeDays(['Saturday', 'Sunday']);
  };

  const selectAllDays = () => {
    onChangeDays([...ALL_DAYS]);
  };

  const clearDays = () => {
    onChangeDays([]);
  };

  return (
    <div className="schedule-picker">
      <div className="schedule-section">
        <div className="schedule-header">
          <label className="schedule-label">
            Working Days ({selectedDays.length} {selectedDays.length === 1 ? 'day' : 'days'})
          </label>
          <div className="schedule-shortcuts">
            <button type="button" onClick={selectWeekdays} className="shortcut-btn">
              Weekdays
            </button>
            <button type="button" onClick={selectWeekends} className="shortcut-btn">
              Weekends
            </button>
            <button type="button" onClick={selectAllDays} className="shortcut-btn">
              All 7 Days
            </button>
            <button type="button" onClick={clearDays} className="shortcut-btn danger">
              Clear
            </button>
          </div>
        </div>
        <div className="pill-grid days-grid">
          {ALL_DAYS.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                className={`pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => toggleDay(day)}
                aria-pressed={isSelected}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="schedule-section">
        <label className="schedule-label">Working Shifts / Time of Day</label>
        <div className="pill-grid slots-grid">
          {ALL_SLOTS.map((slot) => {
            const isSelected = selectedSlots.includes(slot.id);
            return (
              <button
                key={slot.id}
                type="button"
                className={`pill-btn slot-pill ${isSelected ? 'active' : ''}`}
                onClick={() => toggleSlot(slot.id)}
                aria-pressed={isSelected}
              >
                <span className="slot-icon" aria-hidden="true">{slot.icon}</span>
                <span>{slot.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SchedulePicker;
