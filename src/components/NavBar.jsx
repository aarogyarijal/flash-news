import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBookmark,faUserCog } from '@fortawesome/free-solid-svg-icons';

function NavBar({currentPage, handlePageChange}) {
    const handleChange = (page) => {
        handlePageChange(page);
    };

  return (
      <div className="bottom-navbar">
        <div className="nav-item" onClick={()=>{ handleChange("home") }}>
          <FontAwesomeIcon icon={faHome} className={`icon ${currentPage === 'home' ? 'active' : ''}`} />
          <span className="item-name active">Home</span>
        </div>
        <div className="nav-item" onClick={()=>{ handleChange("search") }}>
          <FontAwesomeIcon icon={faSearch} className={`icon ${currentPage === 'search' ? 'active' : ''}`} />
          <span className="item-name">Search</span>
        </div>
        <div className="nav-item" onClick={()=>{ handleChange("saved") }}>
          <FontAwesomeIcon icon={faBookmark} className={`icon ${currentPage === 'saved' ? 'active' : ''}`} />
          <span className="item-name">Saved</span>
        </div>
        <div className="nav-item" onClick={()=>{ handleChange("profile") }}>
          <FontAwesomeIcon icon={faUserCog} className={`icon ${currentPage === 'profile' ? 'active' : ''}`} />
          <span className="item-name">Profile</span>
        </div>
      </div>
  );
}

export default NavBar;
