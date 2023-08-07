import React, { useState, useEffect, Suspense } from 'react';
import ExpertiseBlocks from '../components/ExpertiseBlocks';
import { Link } from 'react-router-dom';
import ReactBackgroundCarousel from '../components/Carousel';
import CompanyReviewsPage from '../components/CompanyReviewsPage';
import TeamComponent from './lazyHome/TeamComponent';
import LocationComponent from './lazyHome/LocationComponent';
import MapContainer from '../components/googleMapReact/MapContainer';

const Home = () => {
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [showMap, setShowMap] = useState(false);
    useEffect(() => {
        const firstImage = new Image();
        firstImage.src = 'https://i.imgur.com/h0IBfBs.webp';
        firstImage.onload = () => {
            setFirstImageLoaded(true);
        };
        return () => {
            firstImage.onload = null;
        };
    }, []);

    useEffect(() => {
        // Simulate loading delay of 3 seconds for the map
        const mapTimeout = setTimeout(() => {
            setShowMap(true);
        }, 3000);

        return () => clearTimeout(mapTimeout);
    }, []);

    const renderMapContainer = () => {
        if (showMap) {
            return <MapContainer />;
        }
        // Display a loading message during the delay
        return <p>Loading map...</p>;
    };
    return (
        <main className='main-content'>
            <div className='home-hero'>
                <div className='home-banner'>
                    <h1 style={{ color: 'black' }} className='banner-title'>
                        Compassionate Orthopedic Care
                    </h1>
                    <p style={{ color: 'black' }} className='banner-description'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate sagittis velit, id convallis tellus aliquet eu. Ut sem felis, fermentum a dui nec, faucibus malesuada elit. Integer euismod, ligula nec ullamcorper bibendum, enim felis tristique nunc, at luctus nisl eros non erat. Sed vel augue ac quam tristique vulputate. Proin ac bibendum elit. Sed ut lectus euismod, hendrerit velit et, interdum justo. Donec egestas euismod mauris, vel efficitur nunc fringilla non. Vivamus quis ante vitae odio pharetra eleifend.


                    </p>
                    <div className='banner-buttons'>
                        <div className='button-wrapper'>
                            <a
                                className='btn header-button-yellow'
                                href='#https://patientportal.oa-pa.com/phxportal/'>
                                Request Appointment
                            </a>
                        </div>
                    </div>
                </div>
                <ReactBackgroundCarousel>
                    <img
                        src='https://i.imgur.com/h0IBfBs.webp'
                        alt='img1'
                        className={`carousel-img ${
                            firstImageLoaded ? 'loaded' : ''
                        }`}
                    />
                    {/* <img
                        src='https://i.imgur.com/Uurig2v.webp'
                        alt='img2'
                        className='carousel-img'
                        loading='lazy'
                    />
                    <img
                        src='https://i.imgur.com/g45zeSd.webp'
                        alt='img3'
                        className='carousel-img'
                        loading='lazy'
                    />
                    <img
                        src='https://i.imgur.com/6NmjwHX.webp'
                        alt='img4'
                        className='carousel-img'
                        loading='lazy'
                    />
                    <img
                        src='https://i.imgur.com/aISSBI0.webp'
                        alt='img5'
                        className='carousel-img'
                        loading='lazy'
                    /> */}
                </ReactBackgroundCarousel>
            </div>
            <div className='home-expertise'>
                <h2 className='section-title'>Areas of Expertise</h2>
                <ExpertiseBlocks />
            </div>
            <TeamComponent />
            <LocationComponent />
            <div className='home-map'>
                {renderMapContainer()}
            </div>
            <div className='home-reviews'>
                <h1 className='section-title'>Company Reviews</h1>
                <CompanyReviewsPage />
            </div>
        </main>
    );
};
export default Home;
