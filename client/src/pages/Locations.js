import PagesHeader from '../components/PagesHeader';
import { Link } from 'react-router-dom';
import MapContainer from '../components/googleMapReact/MapContainer';
import ChatBox from './../components/helpers/ChatBox';
const Locations = () => {
    return (
        <>
            <PagesHeader title='Locations' />;
            <div className='page-container'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='page-info'>
                    <h3>
                        All locations have parking and parking for individuals
                        with disabilities available.
                    </h3>
                    <i style={{ color: 'rgba(243, 74, 2, 100%)' }} class="fab fa-accessible-icon fa-3x"></i>
                </div>
            </div>
            <div className='location-map-section'>
                <MapContainer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                <ChatBox />
            </div>
        </>
    );
};

export default Locations;
