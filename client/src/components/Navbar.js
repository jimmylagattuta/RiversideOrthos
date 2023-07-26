import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {/* Move the logo above and float it to the left */}
        <img src="LAOrthosLogo.jpg" alt="Logo" style={{ height: '40px', marginBottom: '10px' }} />
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>LA Orthos</span>
      </div>
      <div>
        {/* Add other navigation items on the right side */}
        {/* For example: */}
        <a href="/" style={{ margin: '0 10px' }}>Home</a>
        <a href="/about" style={{ margin: '0 10px' }}>About</a>
        <a href="/contact" style={{ margin: '0 10px' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
