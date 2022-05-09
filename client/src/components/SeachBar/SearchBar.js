import "./SearchBar.css";
import { useState } from "react";
const SearchBar = ({ onSearch,className }) => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className={`search-container ${className}`}>
            <div className="search-bar">
                <input value={search} onChange={handleChange} type="text" placeholder="Search" />
            </div>
        </div>
    );
}
export default SearchBar;