import { expertiseBlocks, physicians, locations } from '../data';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='container'>
                <div className='footer-grid'>
                    <div className='footer-item word-wrap-container'>
                        <div className='footer-word-wrap'>Los Angeles</div>
                        <div className='footer-word-wrap'>Orthopedic</div>
                        <div className='footer-word-wrap'>Surgery</div>
                        <div className='footer-word-wrap'>Specialists</div>
                    </div>
                    <div className='footer-item'>
                        <span id="h-four-temp-fix" className='footer-title'>Our Physicians</span>
                        {physicians.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    className='footer-link'
                                    to={`/physicians/${
                                        item.name.toLowerCase().split(' ')[0]
                                    }`}>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className='footer-item'>
                        <span id="h-four-temp-fix" className='footer-title'>Our Locations</span>
                        {locations.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    className='footer-link'
                                    to={item.link}>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className='footer-item'>
                        <span id="h-four-temp-fix" className='footer-title'>Our Services</span>
                        {expertiseBlocks.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    className='footer-link'
                                    to={`/services/${item.name
                                        .toLowerCase()
                                        .split(' ')
                                        .join('-')}`}>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                {/*----------------------------------------------------------------------------------------------*/}
                <span id="h-four-temp-fix" className='footer-name'>Powered By James Lagattuta</span>
                {/*----------------------------------------------------------------------------------------------*/}
            </div>
        </footer>
    );
};

export default Footer;
