import { NavLink, Link } from 'react-router-dom';
import { navMenu } from '../data';
import { useState } from 'react';
const Navbar = () => {
    const [isMobileMenuopen, setIsMobileMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);

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
    return (
        <header className='main-header'>
            <div className='header-top'>
                <button
                    className='mobile-menu-button'
                    onClick={toggleMobileMenu}>
                    <i
                        className={
                            isMobileMenuopen ? 'fa fa-times' : 'fa fa-bars'
                        }
                        aria-hidden='true'></i>
                </button>
                <div className='header-image-container'>
                    <Link to='/' className='logo-link'>
                        <img
                            src='LAOrthos.jpg'
                            alt='LA Ortho Associates'
                            className='header-image'
                            style={{ width: 'auto', height: '120px' }}
                        />

                    </Link>
                    <div className="header-title-div">
                        <h1 className="header-title">Los Angeles Orthopedic Surgury Specialists</h1>
                        <h1 className="header-title">& Advanced Orthopedics</h1>
                    </div>
                </div>
                <div className='header-buttons-container'>
                    <NavLink className='btn header-button-dark' to='/locations'>
                        Call Us
                    </NavLink>
                    <a
                        className='btn header-button-yellow'
                        href='#'>
                        Request Appointment
                    </a>
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
                                    {item.subMenuItems.map((subItem) => {
                                        return (
                                            <NavLink
                                                onClick={resetMobileMenu}
                                                key={subItem}
                                                to={`${item.link}/${
                                                    item.menu === 'Physicians'
                                                        ? subItem
                                                              .toLowerCase()
                                                              .split(' ')[0]
                                                        : subItem
                                                              .toLowerCase()
                                                              .split(' ')
                                                              .join('-')
                                                }`}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'sub-link active'
                                                        : 'sub-link'
                                                }>
                                                {subItem}
                                            </NavLink>
                                        );
                                    })}
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
