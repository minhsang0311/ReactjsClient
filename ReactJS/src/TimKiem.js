import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim()) {
            try {
                const response = await axios.get(`http://localhost:3000/search?keyword=${query}`);
                onSearch(response.data);
            } catch (error) {
                console.error('Lỗi: ', error);
            }
        }
    };

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm..."
            />
            <button type="submit"><i className="bi bi-search-heart-fill"></i></button>
            
        </form>
        
    );
};

export default Search;
