import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  return (
    <div className="search-container">
      <label>Enter city: </label>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="London" 
      />
      <button onClick={() => onSearch(city)}>Search</button>
    </div>
  );
};
export default SearchBar;