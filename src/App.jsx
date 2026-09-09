import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SurveyorList from './components/SurveyorList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [surveyors, setSurveyors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

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
      setSurveyors(data);
    } catch (err) {
      setSurveyors([]);
      setError(
        err.response?.data?.message ||
          'Search failed. Please check the address and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Surveyor Finder — London</h1>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          loading={loading}
        />
      </header>

      <main className="app-main">
        {loading && (
          <div className="loading" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <p>Searching for surveyors…</p>
          </div>
        )}

        {error && !loading && <p className="error-banner">{error}</p>}

        {!loading && (
          <SurveyorList
            surveyors={surveyors}
            hasSearched={hasSearched}
            searchQuery={searchQuery.trim()}
          />
        )}
      </main>
    </div>
  );
}

export default App;
