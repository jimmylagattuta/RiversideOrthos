import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './navbarHelpers/Navbar.css';
import { navMenu } from '../../data';
import ForesightSquareNew from './navbarHelpers/ForesightSquareNew';

const NavbarDesktop = () => {
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const navigate = useNavigate(); // Hook to programmatically navigate

    // Detect if the user is on a touch device
    useEffect(() => {
        const handleTouch = () => {
            console.log('Touch device detected');
            setIsTouchDevice(true);
            navigate('/new-location'); // Navigate to the new location when a touch device is detected
        };
        window.addEventListener('touchstart', handleTouch);

        return () => {
            window.removeEventListener('touchstart', handleTouch);
        };
    }, [navigate]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    // Toggle submenu visibility
    const handleSubmenuToggle = (menu) => {
        const newState = openSubmenu === menu ? null : menu;
        console.log(`Submenu toggle clicked: ${menu} | New state: ${newState}`);
        setOpenSubmenu(newState); // Toggle submenu
    };

    // Close submenu only if it matches the current open one
    const handleSubmenuClose = (menu) => {
        if (openSubmenu === menu && !isTouchDevice) {
            console.log(`Submenu closed for: ${menu}`);
            setOpenSubmenu(null); // Close submenu
        }
    };

    // Handle main link click for "Providers" or "Services" (keep submenu open)
    const handleMainNavClick = (menu, link) => {
        console.log(`Main menu item clicked: ${menu}`);
        navigate(link); // Navigate to the main link
        // Don't close the submenu so users can still select a specific provider or service
    };

    const handleSubmenuItemClick = (menu, subItem, link) => {
        console.log(`Submenu item clicked: ${subItem} under menu: ${menu}`);
        setOpenSubmenu(null); // Close submenu after clicking a submenu item
        navigate(link); // Navigate to the specific submenu item
    };

    return (
        <header className="navbar-wrapper">
            <div className="navbar-desktop-container">
                {/* Logo and company name */}
                <div className="logo-and-company">
                    <Link to="/" className="logo-link-navbar">
                        <img
                            src="https://i.imgur.com/1M8ZlnK.webp"
                            alt="Orthopaedic Associates of Riverside"
                            className="navbar-logo"
                        />
                    </Link>
                    {isPopupOpen && <ForesightSquareNew togglePopup={togglePopup} />}
                    <h1 className="company-name">Orthopaedic Associates of Riverside</h1>
                </div>

                {/* Stacked buttons */}
                <div className="navbar-buttons-desktop">
                    <div className="button-row">
                        <NavLink to="/locations#chatbox" className="nav-button-new" onClick={() => handleMainNavClick('Contact Us', '/locations#chatbox')}>
                            Contact Us
                        </NavLink>
                        <a
                            href="https://www.zocdoc.com/practice/orthopaedic-associates-of-riverside-106014"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button-new"
                            onClick={() => console.log("Book Online clicked")}
                        >
                            Book Online
                        </a>
                    </div>
                    <div className="button-row">
                        <a
                            href="https://self.schdl.com/patient/13806"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button-new"
                            onClick={() => console.log("Pay Online clicked")}
                            style={{ color: 'white', backgroundColor: '#f34a02' }}
                        >
                            Pay Online
                        </a>
                    </div>
                </div>
            </div>

            {/* Banner */}
            <div className="banner-desktop">
                <p>
                    On <span className="highlight-text-desktop">October 22nd, 2024 Midland Orthopedic Associates/Orthopaedic
                    Associates of Riverside</span> has transitioned to a new Electronic Medical
                    Record (EMR) system in order to provide the best experience for our
                    patients. This new system, Modernizing Medicine, will allow 24/7
                    access to schedule appointments, communicate with our staff, pay your
                    bill, and more. Please visit the <span className="highlight-text-desktop">Midland Orthopedics Associates/
                    Orthopaedic Associates of Riverside</span> Patient Portal to learn more:{" "}
                    <a href="https://midlandortho.ema.md" className="link-blue">
                        Patient Portal
                    </a>
                </p>
            </div>

            {/* Navbar links */}
            <nav className="navbar-links">
                {navMenu.map((menuItem, index) => (
                    <div
                        key={index}
                        className="navbar-item"
                        onMouseEnter={() => {
                            if (menuItem.subMenuItems && !isTouchDevice) {
                                console.log(`Hovered over ${menuItem.menu}, opening submenu`);
                                setOpenSubmenu(menuItem.menu);
                            }
                        }}
                        onMouseLeave={() => handleSubmenuClose(menuItem.menu)} // Close only if it's the same submenu
                        onClick={() => isTouchDevice && handleSubmenuToggle(menuItem.menu)} // Toggle submenu on click for touch devices
                    >
                        {menuItem.subMenuItems ? (
                            <>
                                {/* Menu with submenu */}
                                <div className="navbar-link" onClick={() => handleMainNavClick(menuItem.menu, menuItem.link)}>
                                    {menuItem.menu}
                                </div>
                                {openSubmenu === menuItem.menu && (
                                    <div className="submenu">
                                        {menuItem.subMenuItems.map((subItem, idx) => (
                                            <div
                                                key={idx}
                                                className="submenu-link"
                                                onClick={() => handleSubmenuItemClick(menuItem.menu, subItem, `${menuItem.link}/${subItem.toLowerCase().replace(/\s+/g, '-')}`)}
                                            >
                                                {subItem}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            // Menu without submenu
                            <NavLink
                                to={menuItem.link}
                                className="navbar-link"
                                onClick={() => handleMainNavClick(menuItem.menu, menuItem.link)}
                            >
                                {menuItem.menu}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>
        </header>
    );
};

export default NavbarDesktop;
