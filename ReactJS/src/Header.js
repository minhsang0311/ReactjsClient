import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './TimKiem';

function Header() {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div>
            <div id="menu">
                <div className="logo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2y1SiHhHSbu07UKmaGS9-YkRwtLwziHgv9A&s" alt="logo" />
                </div>
                <Search onSearch={setSearchResults} />
                <div><i className="bi bi-people"></i>Đăng ký</div>
                <div><Link to="/showcart"><i className="bi bi-cart"></i>Giỏ hàng</Link></div>
            </div>
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <img src={result.hinh} alt={result.ten_sp} />
                        <div>{result.ten_sp}</div>
                        <div>Giá: {result.gia}</div>
                        <div>Giá khuyến mãi: {result.gia_km}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Header;
