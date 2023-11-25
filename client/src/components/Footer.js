import { expertiseBlocks, physicians, locations } from '../data';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='container'>
                <div className='footer-grid'>
                    <div className='footer-item word-wrap-container'>
                        <div className='footer-word-wrap'>Los Angeles Orthopedic Surgery Specialists</div>
                    </div>
                    <div className='footer-item'>
                        <Link
                            className='footer-link'
                            to='/about-us/privacy-policy'
                        >
                            PRIVACY
                        </Link>
                    </div>
                    <div className='footer-item'>
                        <Link
                            className='footer-link'
                            to='/about-us/privacy-policy'
                        >
                            TERMS & CONDITIONS
                        </Link>
                    </div>
                    <div className='footer-item'>
                        <Link
                            className='footer-link'
                            to='/locations'
                        >
                            ACCESSIBILITY
                        </Link>
                    </div>
                    <div className='footer-item'>
                        <Link
                            className='footer-link'
                            to='/locations'
                        >
                            CONTACT US
                        </Link>
                    </div>
                </div>
                {/*----------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------*/}
            </div>
            <div id="h-four-temp-fix" className='footer-name'>Powered By James Lagattuta</div>
        </footer>
    );
};

export default Footer;
