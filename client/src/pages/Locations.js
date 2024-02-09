import React, { useRef, useEffect } from 'react';
import PagesHeader from '../components/PagesHeader';
import { Link } from 'react-router-dom';
import MapContainer from '../components/googleMapReact/MapContainer';
import ChatBox from './../components/helpers/ChatBox';
const Locations = () => {
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (window.location.hash === '#chatbox') {
            setTimeout(() => {
                chatBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }, []);
    
    console.log('window', window);
    return (
        <>
            <PagesHeader title='Locations' />;
            <div className='page-container'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} className='page-info'>
                    <h3 style={{ alignSelf: 'baseline' }}>
                        All locations have parking and parking for individuals
                        with disabilities available.
                    </h3>
                    <i style={{ color: 'var(--violet)', alignSelf: 'baseline', paddingLeft: '10px', fontSize: '1.5rem' }} class="fas fa-wheelchair"></i>
                </div>
            </div>
            <div className='location-map-section'>
                <MapContainer />
            </div>
            <div ref={chatBoxRef} style={{ display: 'flex', justifyContent: 'center', padding: "110px 0px 45px 0px" }}>
                <ChatBox />
            </div>
        </>
    );
};

export default Locations;
