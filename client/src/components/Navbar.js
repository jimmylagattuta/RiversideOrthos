import React, { useState, useEffect, Suspense } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navMenu } from '../data';
import RequestAppointmentForm from './helpers/RequestAppointmentForm';
const Navbar = () => {
    const [isMobileMenuopen, setIsMobileMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
    const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false); // State to manage appointment form visibility
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation(); // Use useLocation hook to get the current location

    const togglePopup = () => {
      console.log('togglePopup');
      setIsPopupOpen(!isPopupOpen);
    };
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuopen);
    };
    const submenuOpen = (menuName) => {
        isSubmenuOpen === menuName
            ? setIsSubmenuOpen(null)
            : setIsSubmenuOpen(menuName);
    };

    const resetMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsSubmenuOpen(null);
    };
    const toggleAppointmentForm = () => {
        if (location.pathname === '/locations') {
          const scrollToHeight = document.body.scrollHeight * 0.8;
          const start = window.scrollY;
          const end = scrollToHeight;
          const duration = 1000; // Duration of the scroll animation in milliseconds
      
          let startTime;
      
          const scrollAnimation = (timestamp) => {
            if (!startTime) {
              startTime = timestamp;
            }
      
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
      
            const easedProgress = easeInOutCubic(progress); // Apply easing function
      
            window.scrollTo(0, start + (end - start) * easedProgress);
      
            if (elapsed < duration) {
              // Continue the animation
              window.requestAnimationFrame(scrollAnimation);
            }
          };
      
          // Easing function for smooth scroll animation
          const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
          // Start the animation
          window.requestAnimationFrame(scrollAnimation);
        }
      };
      
    return (
        <header className='main-header'>
            <div className='header-top'>
                <button
                    className='mobile-menu-button'
                    onClick={toggleMobileMenu}
                    style={{ color: 'white' }}
                    >
                    
                    <i
                        className={
                            isMobileMenuopen ? 'fa fa-times' : 'fa fa-bars'
                        }
                        aria-hidden='true'></i>
                </button>
                <Link to='/' className='logo-link' style={{ textDecorationLine: 'none' }}>
                    <div className='header-image-container'>
                        <img
                            src='https://i.imgur.com/1M8ZlnK.webp'
                            alt='Riverside Orthopaedics Associates'
                            className='header-image'

                        />

                        <div className="header-title-div">
                            <h1 className="header-title">Orthopaedic Associates Of Riverside</h1>
                        </div>
                    </div>
                </Link>
            


                <div className='header-buttons-container' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='nav-buttons-div'>
                        <NavLink className='btn header-button-dark'
                            onClick={toggleAppointmentForm}
                            to={{ pathname: '/locations', hash: '#chatbox' }}
                        >
                            <span className="rise">
                                Call Us
                            </span>
                        </NavLink>
                        <div className='btn header-button-yellow'
                            onClick={togglePopup}
                            >
                            <span className="rise">
                                Download Forms
                            </span>
                        </div>
                    </div>
                    {/* <div className="navbar-special-buttons">
                        <a href="https://www.facebook.com/orthoriverside" target="_blank">
                            <i style={{ padding: '10px', fontSize: '1.5rem', color: 'white' }} className="fab fa-facebook"></i>
                        </a>
                        <div
                            onClick={() => console.log('Translate To English')}
                            style={{ cursor: "pointer", padding: '10px', fontSize: '2rem', alignSelf: 'center' }}
                            >
                            <img src="https://i.imgur.com/2TvF7x4.webp" alt="English Flag" />
                        </div>
                        <div
                            onClick={() => console.log('Translate To Polish')}
                            style={{ cursor: "pointer", padding: '10px', fontSize: '2rem', alignSelf: 'center' }}
                            >
                            <img src="https://i.imgur.com/95gzZ96.webp" alt="Polish Flag" />
                        </div>
                        <div
                            onClick={() => console.log('Translate To Spanish')}
                            style={{ cursor: "pointer", padding: '10px', fontSize: '2rem', alignSelf: 'center' }}
                            >
                            <img src="https://i.imgur.com/p8KxvS7.webp" alt="Spanish Flag" />
                        </div>
                        <div
                            onClick={() => console.log('Search Button')}
                            style={{ cursor: "pointer", padding: '10px', fontSize: '1.5rem' }}
                            >
                            <i style={{ color: 'white' }} class="fas fa-search"></i>
                        </div>
                    </div> */}
                    {isPopupOpen && (
                        <div id="form-divs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'absolute', marginTop: '60px', width: 'max-content', right: '0', backgroundColor: 'var(--violet)', zIndex: '2', padding: '15px', borderStyle: 'solid', borderColor: 'var(--white)', borderWidth: '1px' }}>
                            <h4 style={{ padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none', textShadow: 'black 1px 1px 6px' }}>* You need to bring these forms finished on first visit.</h4>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Registration Form</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px', marginTop: '12px'}}
                                href={process.env.PUBLIC_URL + '/Registration.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                New Patient Registration Form
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/RegistrationSpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Formulario de Registro de Pacientes Nuevos
                            </a>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Authorization Form</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', marginTop: '10px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/DAR.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Designated Authorized Representative
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/DARSpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Representante Autorizado Designado
                            </a>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Release Form</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', marginTop: '10px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/authorization.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                HIPAA Authorization and Release
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/authorizationSpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Autorización y Liberación de HIPAA
                            </a>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Medical Histroy</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', marginTop: '10px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/MedHistory.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Medical History
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/MedHistorySpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Historial Médico
                            </a>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Privacy Form</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', marginTop: '10px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/PrivacyNotice.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Privacy Notice {"(HIPAA)"}
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/PrivacyNoticeSpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Aviso de Privacidad {"(HIPAA)"}
                            </a>
                            <h4 style={{ margin: '5px 0px 0px 0px', padding: '0px 10px 0px 10px', width: '80%', color: 'white', textTransform: 'none' }}>Financial Form</h4>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', marginTop: '10px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/FinancialPolicy.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Financial Policy
                            </a>
                            <a
                                className='btn header-button-yellow'
                                style={{ fontSize: '0.9rem', fontFamily: 'sans-serif', zIndex: '10', boxShadow: '0.5px 0.5px 2px white', borderRadius: '0px', margin: '2px', padding: '0px 24px 0px 24px' }}
                                href={process.env.PUBLIC_URL + '/FinancialPolicySpanish.pdf'}
                                target="_blank" // This opens the PDF in a new tab
                                rel="noopener noreferrer" // Recommended for security when using target="_blank"
                                download
                            >
                                Política Financiera
                            </a>    
                        </div>
                    )}
                    {showThankYouMessage && (
                        <div className="thank-you-message">
                            Thank you for the message! We will be with you shortly.
                        </div>
                    )}
                </div>
            </div>
            <nav
                className={`navbar ${isSubmenuOpen}-open ${
                    isMobileMenuopen ? 'mobile-menu-show' : ''
                }`}>
                {navMenu.map((item, index) => {
                    return (
                        <div key={index} className={`nav-link-container ${item.menu}-nav`}>
                            <div className='link-items'>
                                <NavLink
                                    onClick={resetMobileMenu}
                                    key={item.menu}
                                    to={item.link}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }>
                                    {item.menu}
                                </NavLink>
                                {item.subMenuItems && (
                                    <button
                                        className='mobile-toggle-submenu'
                                        onClick={() => submenuOpen(item.menu)}>
                                        {isSubmenuOpen === item.menu ? (
                                            <i className='fas fa-minus'></i>
                                        ) : (
                                            <i className='fas fa-plus'></i>
                                        )}
                                    </button>
                                )}
                            </div>
                            {item.subMenuItems && (
                                <div className='submenu'>
                                    <NavLink
                                        onClick={resetMobileMenu}
                                        key={item.menu}
                                        to={item.link}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'sub-link mobile-nav-link active'
                                                : 'sub-link mobile-nav-link'
                                        }
                                        end>
                                        All {item.menu}
                                    </NavLink>
                                    <div className={`submenu-list ${item.subMenuItems.length > 16 ? 'submenu-multi-column' : item.subMenuItems.length > 6 ? 'submenu-two-column' : ''}`}>
                                        {item.subMenuItems.map((subItem) => {
                                            return (
                                                <NavLink
                                                    onClick={resetMobileMenu}
                                                    key={subItem}
                                                    to={`${item.link}/${subItem.toLowerCase().split(' ').join('-')}`}
                                                    className={({ isActive }) =>
                                                        isActive ? 'sub-link active' : 'sub-link'
                                                    }>
                                                    {subItem}
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
};
export default Navbar;
