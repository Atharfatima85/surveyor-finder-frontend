import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import SurveyorCard from './components/SurveyorCard';
import AddSurveyorModal from './components/modals/AddSurveyorModal';
import EditSurveyorModal from './components/modals/EditSurveyorModal';
import ViewSurveyorModal from './components/modals/ViewSurveyorModal';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [allSurveyors, setAllSurveyors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState(null);
  const [activeSurveyor, setActiveSurveyor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchSurveyors = async () => {
    setListLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/surveyors`);
      setAllSurveyors(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not load surveyors. Is the backend running?'
      );
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveyors();
  }, []);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query || loading) return;

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const encodedQuery = encodeURIComponent(query);
      const { data } = await axios.get(
        `${API_URL}/api/surveyors/search?address=${encodedQuery}`
      );
      setSearchResults(data);
    } catch (err) {
      setSearchResults([]);
      setError(
        err.response?.data?.message ||
          'Search failed. Please check the address and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal(null);
    setActiveSurveyor(null);
    setFormError('');
    setSaving(false);
  };

  const handleView = async (surveyor) => {
    setSelectedId(surveyor._id);
    setFormError('');
    try {
      const { data } = await axios.get(
        `${API_URL}/api/surveyors/${surveyor._id}`
      );
      setActiveSurveyor(data);
      setModal('view');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load surveyor.');
    }
  };

  const handleEdit = (surveyor) => {
    setSelectedId(surveyor._id);
    setActiveSurveyor(surveyor);
    setFormError('');
    setModal('edit');
  };

  const handleDelete = async (surveyor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${surveyor.name}?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/surveyors/${surveyor._id}`);
      if (selectedId === surveyor._id) setSelectedId(null);
      await fetchSurveyors();
      setSearchResults((current) =>
        current.filter((item) => item._id !== surveyor._id)
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete surveyor.');
    }
  };

  const handleCreate = async (payload) => {
    setSaving(true);
    setFormError('');
    try {
      await axios.post(`${API_URL}/api/surveyors`, payload);
      await fetchSurveyors();
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not add surveyor.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (payload) => {
    if (!activeSurveyor?._id) return;
    setSaving(true);
    setFormError('');
    try {
      await axios.put(
        `${API_URL}/api/surveyors/${activeSurveyor._id}`,
        payload
      );
      await fetchSurveyors();
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Could not update surveyor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        surveyors={allSurveyors}
        loading={listLoading}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={() => {
          setFormError('');
          setModal('add');
        }}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-panel">
        <header className="hero">
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <p className="eyebrow">London RICS surveyors</p>
          <h1>Find a surveyor near your property</h1>
          <p className="lede">
            Search by address to see driving distance and travel time to
            available local surveyors.
          </p>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            loading={loading}
          />
        </header>

        <div className="main-content">
          {loading && (
            <div className="loading" role="status" aria-live="polite">
              <span className="spinner" aria-hidden="true" />
              <p>Searching for surveyors…</p>
            </div>
          )}

          {error && !loading && <p className="error-banner">{error}</p>}

          {!loading && !hasSearched && (
            <p className="empty-state">
              Search an area or address to find nearby surveyors.
            </p>
          )}

          {!loading && hasSearched && searchResults.length === 0 && !error && (
            <p className="empty-state">
              No surveyors found near {searchQuery}.
            </p>
          )}

          {!loading && searchResults.length > 0 && (
            <section className="results" aria-live="polite">
              <p className="results-count">
                Found {searchResults.length} surveyors near {searchQuery.trim()}
              </p>
              <div className="card-grid">
                {searchResults.map((surveyor, index) => (
                  <SurveyorCard
                    key={surveyor._id}
                    surveyor={surveyor}
                    isNearest={index === 0}
                    onSelect={() => setSelectedId(surveyor._id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {modal === 'add' && (
        <AddSurveyorModal
          onClose={closeModal}
          onSubmit={handleCreate}
          saving={saving}
          error={formError}
        />
      )}

      {modal === 'edit' && activeSurveyor && (
        <EditSurveyorModal
          surveyor={activeSurveyor}
          onClose={closeModal}
          onSubmit={handleUpdate}
          saving={saving}
          error={formError}
        />
      )}

      {modal === 'view' && activeSurveyor && (
        <ViewSurveyorModal surveyor={activeSurveyor} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
