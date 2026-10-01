import { FiSearch } from 'react-icons/fi';

function SearchBar({ searchQuery, setSearchQuery, onSearch, loading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="search-query" className="visually-hidden">
        Area or address
      </label>
      <input
        id="search-query"
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Enter UK postcode or address (e.g. SW1A 1AA, SE1 1TQ, Whitechapel)"
        autoComplete="street-address"
      />
      <button type="submit" disabled={loading || !searchQuery.trim()}>
        <FiSearch aria-hidden="true" />
        {loading ? 'Searching…' : 'Find surveyors'}
      </button>
    </form>
  );
}

export default SearchBar;
