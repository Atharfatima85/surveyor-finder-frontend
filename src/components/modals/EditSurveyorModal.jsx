import { useState } from 'react';
import AddressLocationField from './AddressLocationField';

function EditSurveyorModal({ surveyor, onClose, onSubmit, saving, error }) {
  const [form, setForm] = useState({
    name: surveyor.name || '',
    phone: surveyor.phone || '',
    address: surveyor.address || '',
    areas: Array.isArray(surveyor.areas) ? surveyor.areas.join(', ') : '',
    isAvailable: surveyor.isAvailable !== false,
  });
  const [coords, setCoords] = useState({
    latitude: surveyor.latitude ?? null,
    longitude: surveyor.longitude ?? null,
  });

  const updateField = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      areas: form.areas
        .split(',')
        .map((area) => area.trim())
        .filter(Boolean),
      isAvailable: form.isAvailable,
    };

    if (coords.latitude != null && coords.longitude != null) {
      payload.latitude = coords.latitude;
      payload.longitude = coords.longitude;
    }

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="edit-surveyor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 id="edit-surveyor-title">Edit Surveyor</h2>
        <form className="surveyor-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input required value={form.name} onChange={updateField('name')} />
          </label>
          <label>
            Phone
            <input required value={form.phone} onChange={updateField('phone')} />
          </label>
          <AddressLocationField
            address={form.address}
            onAddressChange={(address) =>
              setForm((current) => ({ ...current, address }))
            }
            onCoordsChange={setCoords}
          />
          <label>
            Areas covered
            <input
              value={form.areas}
              onChange={updateField('areas')}
              placeholder="Whitechapel, Aldgate, E1"
            />
          </label>
          <label className="toggle-row">
            <span>Available</span>
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={updateField('isAvailable')}
            />
            <span>{form.isAvailable ? 'Yes' : 'No'}</span>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="submit-btn" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSurveyorModal;
