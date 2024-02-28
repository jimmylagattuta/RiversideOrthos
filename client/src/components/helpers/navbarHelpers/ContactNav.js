import React, { useState } from 'react';
import './ContactNav.css';

const MenuComponent = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleItemOpen = () => {
    setMenuOpen(!isMenuOpen);
    // setMenuOpen(true);
  };

  return (
    <div className={isMenuOpen ? 'menu-open' : ''}>


        <div onClick={handleItemOpen} className="nav-phone-and-seperater">
            <p className="words-appear">Call</p><p className="nav-seperater">{` `}Us</p><p className="nav-seperater">|{` `}</p><i id="nav-phone" className='fas fa-mobile-alt fa-2x'></i>
            <p className="words-appear">Directions</p><i id="nav-map" className='fas fa-map-marked-alt fa-1x'></i>
        </div>
      
      
      
      {isMenuOpen && (
        <div className="contact-nav-menu">
          <div className='riverside-call-directions'>
            <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            Riverside <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
          </div>
          <div className='riverside-call-directions'>
            <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            La Grange <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
          </div>
          <div className='riverside-call-directions'>
            <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            Chicago <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
