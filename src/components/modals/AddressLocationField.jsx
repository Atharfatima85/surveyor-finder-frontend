import { useRef, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function AddressLocationField({ address, onAddressChange, onCoordsChange }) {
  const [geocoding, setGeocoding] = useState(false);
  const [status, setStatus] = useState('');
  const lastGeocoded = useRef('');

  const detectLocation = async () => {
    const trimmed = address.trim();
    if (!trimmed || geocoding) return;

    if (lastGeocoded.current === trimmed && status === 'found') {
      return;
    }

    setGeocoding(true);
    setStatus('');

    try {
      const encoded = encodeURIComponent(trimmed);
      const { data } = await axios.get(
        `${API_URL}/api/surveyors/geocode?address=${encoded}`
      );
      lastGeocoded.current = trimmed;
      onCoordsChange({ latitude: data.lat, longitude: data.lng });
      setStatus('found');
    } catch {
      lastGeocoded.current = '';
      onCoordsChange({ latitude: null, longitude: null });
      setStatus('error');
    } finally {
      setGeocoding(false);
    }
  };

  return (
    <div className="address-field">
      <label htmlFor="surveyor-address">Address</label>
      <div className="address-row">
        <input
          id="surveyor-address"
          required
          value={address}
          onChange={(event) => {
            setStatus('');
            onCoordsChange({ latitude: null, longitude: null });
            onAddressChange(event.target.value);
          }}
          onBlur={detectLocation}
        />
        <button
          type="button"
          className="geocode-btn"
          onClick={detectLocation}
          disabled={geocoding || !address.trim()}
        >
          {geocoding ? 'Finding…' : '📍 Find Location'}
        </button>
      </div>
      {geocoding && (
        <p className="geocode-status geocode-loading">
          <span className="geocode-spinner" aria-hidden="true" />
          Finding location…
        </p>
      )}
      {!geocoding && status === 'found' && (
        <p className="geocode-status geocode-found">✅ Location found</p>
      )}
      {!geocoding && status === 'error' && (
        <p className="geocode-status geocode-error">
          ❌ Could not find location, please check address
        </p>
      )}
    </div>
  );
}

export default AddressLocationField;
