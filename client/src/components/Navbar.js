import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navMenu } from '../data';
import RequestAppointmentForm from './helpers/RequestAppointmentForm';
import './helpers/navbarHelpers/Navbar.css';
import './helpers/navbarHelpers/FormDiv.css';
import ForesightSquare from './helpers/navbarHelpers/ForesightSquare';
import ForesightSquareNew from './helpers/navbarHelpers/ForesightSquareNew';
import ContactNav from './helpers/navbarHelpers/ContactNav';
import NavbarDesktop from './helpers/NavbarDesktop'; // Import the NavbarDesktop component
import './helpers/navbarHelpers/ContactNav.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(null); // Tracks open submenu
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 853); // Track if screen is 853px or larger

    // Handle window resize event to check if screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 853);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSubmenu = (menuItem) => {
        setIsSubmenuOpen((prev) => (prev === menuItem.menu ? null : menuItem.menu)); // Toggle submenu open/close
    };

    const resetMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsSubmenuOpen(null); // Reset submenu when closing mobile menu
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closeForm = () => {
        setIsPopupOpen(false);
    };

    // Conditionally render NavbarDesktop for large screens
    if (isLargeScreen) {
        return <NavbarDesktop />; // Render the desktop version for screens 853px or larger
    }

    // Mobile version for smaller screens
    return (
        <header className="navbar-wrapper">
            <div className="navbar-div">
                <div className="navbar-container">
                    <Link to="/" className="logo-link-navbar" style={{ textDecoration: 'none' }}>
                        <div className="logo-and-title">
                            <img
                                src="https://i.imgur.com/1M8ZlnK.webp"
                                alt="Orthopaedic Associates of Riverside"
                                className="navbar-logo"
                            />
                        </div>
                    </Link>
                    <button
                        aria-label="Mobile navbar button"
                        className="mobile-menu-button-navbar"
                        onClick={toggleMobileMenu}
                    >
                        <i
                            className={isMobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'}
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>

            {isPopupOpen && <ForesightSquareNew togglePopup={togglePopup} />}

            {isMobileMenuOpen && (
                <nav className="mobile-menu">
                    <h2 className="mobile-title">Orthopaedic Associates Of Riverside</h2>

                    <div className="navbar-buttons-above">
                        <NavLink to="/locations#chatbox" className="nav-button-new">
                            Contact Us
                        </NavLink>
                        <a
                            href="https://self.schdl.com/patient/13806"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button-new"
                        >
                            Book Online
                        </a>
                    </div>

                    <div className="navbar-buttons-below">
                        <a
                            href="https://midlandortho.ema.md/ema/pay/onlinepayments#/pm/payfac/pay"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-button-new"
                            style={{ color: 'white', backgroundColor: '#f34a02' }}
                        >
                            Pay Online
                        </a>
                    </div>

                    {navMenu.map((menuItem, index) => (
                        <div key={index} className="mobile-menu-item">
                            {menuItem.subMenuItems ? (
                                <div
                                    className="mobile-menu-link"
                                    onClick={() => toggleSubmenu(menuItem)}
                                >
                                    {isSubmenuOpen === menuItem.menu ? '−' : '+'} {menuItem.menu}
                                </div>
                            ) : (
                                <NavLink
                                    to={menuItem.link}
                                    className="mobile-menu-link"
                                    onClick={resetMobileMenu}
                                >
                                    {menuItem.menu}
                                </NavLink>
                            )}

                            {menuItem.subMenuItems && isSubmenuOpen === menuItem.menu && (
                                <div className="submenu">
                                    {menuItem.subMenuItems.map((subItem, idx) => (
                                        <NavLink
                                            key={idx}
                                            to={`${menuItem.link}/${subItem
                                                .toLowerCase()
                                                .replace(/\s+/g, '-')}`}
                                            className="submenu-link"
                                            onClick={resetMobileMenu}
                                        >
                                            {subItem}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            {!isMobileMenuOpen && (
                <div className="banner">
                    <p>
                        On <span className="highlight-text">October 22nd, 2024 Midland Orthopedic Associates/Orthopedic
                        Associates of Riverside</span> has transitioned to a new Electronic Medical
                        Record (EMR) system in order to provide the best experience for our
                        patients. This new system, Modernizing Medicine, will allow 24/7
                        access to schedule appointments, communicate with our staff, pay your
                        bill, and more. Please visit the <span className="highlight-text">Midland Orthopedics Associates/
                        Orthopedic Associates of Riverside</span> Patient Portal to learn more:{" "}
                        <a href="https://midlandortho.ema.md" className="link-blue">
                            Patient Portal
                        </a>
                    </p>
                </div>
            )}
        </header>
    );
};

export default Navbar;