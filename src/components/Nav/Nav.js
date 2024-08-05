// Nav.js
import './nav.css';
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import DropDown from './DropDown/DropDown';
import RegistProduct from './RegistProduct/RegistProduct';

const Nav = ({ setOrderBy, setSearchQuery, setCurrentPage }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="navContainer">
        <div className="navContainer2">
          <p className="navText">판매중인 상품</p>
          <RegistProduct />
        </div>
        <div className="navContainer3">
          <SearchForm setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
          <DropDown setOrderBy={setOrderBy} />
        </div>
      </div>
    );
  }

  return (
    <div className="navContainer">
      <p className="navText">판매중인 상품</p>
      <div className="navContainer2">
        <SearchForm setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
        <RegistProduct />
        <DropDown setOrderBy={setOrderBy} />
      </div>
    </div>
  );
};

export default Nav;