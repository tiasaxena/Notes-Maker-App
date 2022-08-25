import React from 'react';
import '../Header/Header.css';

function Header({heading}) {
  return (
    <>
      <header className="header">
        <h3 className="header__title">{heading}</h3>
      </header>
    </>
  )
}

export default Header;