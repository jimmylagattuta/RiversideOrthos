import React, { useState } from 'react';
import './ContactNav.css';

const MenuComponent = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredDetails, setHoveredDetails] = useState('');
  const [hoveredPhoneDetails, setHoveredPhoneDetails] = useState('');

  console.log('hoveredDetails', hoveredDetails);
  console.log('hoveredPhoneDetails', hoveredPhoneDetails);

  const handleMouseEnter = (item, details, isPhone) => {
    setHoveredItem(item);
  
    let lines = details.split('\n');
    let addressLines = [];
    let phoneNumberLines = [];
  
    // Iterate through each line to categorize as address or phone number
    lines.forEach(line => {
      // Check if the line matches a phone number pattern
      const phoneNumberRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
      if (phoneNumberRegex.test(line)) {
        phoneNumberLines.push(line);
      } else {
        addressLines.push(line);
      }
    });
  
    // Highlight the first phone number
    if (isPhone && phoneNumberLines.length > 0) {
      const highlightedPhoneNumber = `<p style="color: yellow;">${phoneNumberLines[0]}</p>`;
      setHoveredDetails(details.replace(phoneNumberLines[0], highlightedPhoneNumber));
    } else {
      setHoveredDetails(details.replace(addressLines.join('\n'), `<p style="color: yellow;">${addressLines.join('\n')}</p>`));
      setHoveredPhoneDetails(''); // Clear the phone details
    }
  };
  
  
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredDetails('');
  };

  const handleItemOpen = () => {
    setMenuOpen(!isMenuOpen);
    // setMenuOpen(true);
  };

  const getHoveredStyle = (item) => {
    return item === hoveredItem ? { backgroundColor: 'yellow' } : {};
  };

  const getAddressHoveredStyle = () => {
    return getHoveredStyle('address');
  };

  const getPhoneHoveredStyle = () => {
    return getHoveredStyle('phone');
  };

  return (
    <div className={isMenuOpen ? 'menu-open' : ''}>
      <div onClick={handleItemOpen} className="nav-phone-and-seperater">
        <p className="words-appear">Call/</p><p className="nav-seperater">{` `}Us</p><p className="nav-seperater">|{` `}</p>
        <p className="words-appear">Directions</p>
      </div>
      {isMenuOpen && (
        <div className="contact-nav-menu">
          <div className='riverside-call-directions'>
            <a
              id="map-icon-nav"
              href='tel:+17084420221'
              title='Phone clickable'
              onMouseEnter={() => handleMouseEnter('Riverside', '353 East Burlington Street, 100\nRiverside, IL 60546\n708-442-0221\nFax: 708-442-5670', true)}
              onMouseLeave={handleMouseLeave}
              style={getPhoneHoveredStyle()}
            >
              <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            </a>
            Riverside
            <a
              id="map-icon-nav"
              href={`https://maps.google.com/?q=353+East+Burlington+Street,+100+Riverside,+IL+60546`}
              onMouseEnter={() => handleMouseEnter('Riverside', '353 East Burlington Street, 100\nRiverside, IL 60546\n708-442-0221\nFax: 708-442-5670', false)}
              onMouseLeave={handleMouseLeave}
              style={getAddressHoveredStyle()}
            >
              <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
            </a>
          </div>
          <div className='riverside-call-directions'>
            <a
              id="map-icon-nav"
              href='tel:+17084420221'
              title='Phone clickable'
              onMouseEnter={() => handleMouseEnter('La Grange', '5201 Willow Springs Road, 280\nLa Grange, IL 60525\n708-442-0221\nFax: 708-442-5670', true)}
              onMouseLeave={handleMouseLeave}
              style={getPhoneHoveredStyle()}
            >
              <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            </a>
            La Grange
            <a
              id="map-icon-nav"
              href={`https://maps.google.com/?q=5201+Willow+Springs+Road,+280+La+Grange,+IL+60525`}
              onMouseEnter={() => handleMouseEnter('La Grange', '5201 Willow Springs Road, 280\nLa Grange, IL 60525\n708-442-0221\nFax: 708-442-5670', false)}
              onMouseLeave={handleMouseLeave}
              style={getAddressHoveredStyle()}
            >
              <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
            </a>
          </div>
          <div className='riverside-call-directions'>
            <a
              id="map-icon-nav"
              href='tel:+17084420221'
              title='Phone clickable'
              onMouseEnter={() => handleMouseEnter('Chicago', '6084 S Archer Avenue\nChicago, IL 60638\n708-442-0221\nFax: 708-442-5670', true)}
              onMouseLeave={handleMouseLeave}
              style={getPhoneHoveredStyle()}
            >
              <i id="nav-phone-call" className='fas fa-mobile-alt fa-2x'></i>
            </a>
            Chicago
            <a
              id="map-icon-nav"
              href={`https://maps.google.com/?q=6084+S+Archer+Avenue+Chicago,+IL+60638`}
              onMouseEnter={() => handleMouseEnter('Chicago', '6084 S Archer Avenue\nChicago, IL 60638\n708-442-0221\nFax: 708-442-5670', false)}
              onMouseLeave={handleMouseLeave}
              style={getAddressHoveredStyle()}
            >
              <i id="nav-map-go" className='fas fa-map-marked-alt fa-1x'></i>
            </a>
          </div>
          {hoveredDetails && (
            <div style={{ maxWidth: '140px', backgroundColor: 'rgb(143, 0, 72)', zIndex: '8', padding: '5px', lineHeight: '1.5' }}>
              <p dangerouslySetInnerHTML={{ __html: hoveredDetails }}></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
