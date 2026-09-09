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
        placeholder="Enter area or address (e.g. Whitechapel, London)"
        autoComplete="street-address"
      />
      <button type="submit" disabled={loading || !searchQuery.trim()}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
