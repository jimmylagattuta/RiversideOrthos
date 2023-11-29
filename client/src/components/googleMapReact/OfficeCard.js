// OfficeCard.js
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { officesData } from '../../data';

const InfoWindow = ({ place, handleInfoWindowClose }) => {
    return (
        <div className='location-info-window'>
            <h2 style={{ fontSize: 16, marginBottom: 5 }}>{place.city}</h2>
            <div className='info-window-text'>{place.addressOne}</div>
            <div className='info-window-text'>{place.addressTwo}</div>
            <div className='info-window-text' style={{ marginTop: 5 }}>
                <span style={{ fontStyle: 'bold' }}>Phone:</span> {place.phone}
            </div>
            <div className='info-window-text'>
                <span style={{ fontStyle: 'bold' }}>Fax:</span> {place.fax}
            </div>
            <div className='mobile-show'>
                <h2 style={{ fontSize: 14, marginBottom: 3, marginTop: 3 }}>
                    Hours of Operation
                </h2>
                <div className='info-window-text'>
                    {place.city === 'Montebello' ? 'Mon, Tue, Thu, Fri' : (place.city === 'Glendale' ? 'Mon, Tue, Wed, Fri' : 'Monday - Friday')}
                </div>
                <div className='info-window-text'>8AM-5PM</div>
            </div>
            <div className='info-window-icons'>
                <a
                    className='info-window-icon'
                    href={`https://maps.google.com/?q=${place.addressOne
                        .split(' ')
                        .join('+')}${place.addressTwo.split(' ').join('+')}`}>
                    <i
                        style={{
                            fontSize: 25,
                            margin: '10px 20px 0 0',
                        }}
                        className='fas fa-map-marked-alt fa-1x'></i>
                </a>
                <a
                    className='info-window-icon'
                    href={`tel:+1${place.phone.split('-').join('')}`}
                    title='Phone clickable'>
                    <i className='fas fa-mobile-alt fa-2x'></i>
                </a>
            </div>
            <div className='info-window-image-container'>
                <img
                    src={place.image}
                    alt={place.city}
                    className='info-window-image'
                />
            </div>
        </div>
    );
};

const Marker = ({
    show,
    place,
    handleInfoWindowClose,
    handleHover,
    id,
    markerSelected,
}) => {
    return (
        <>
            <i
                className={
                    show
                        ? 'fas fa-map-marker-alt fa-2x active-marker'
                        : 'fas fa-map-marker-alt fa-2x'
                }
                aria-hidden='true'
                onMouseLeave={() => {
                    if (!markerSelected) {
                        handleInfoWindowClose();
                    }
                }}
                ></i>
            {/* {show && (
                <InfoWindow
                    place={place}
                    handleInfoWindowClose={handleInfoWindowClose}
                    markerSelected={markerSelected}
                />
            )} */}
        </>
    );
};
const OfficeCard = () => {
    const [offices, setOffices] = useState(officesData);
  
    return (
      <div className='office-card'>
        {offices.map((place) => (
          <div key={place.id} style={{ height: '90vh', width: '90vw', padding: '100px', display: 'flex' }} className='map-container'>
            <GoogleMapReact
              defaultZoom={14}
              defaultCenter={{
                lat: place.coordinates.lat,
                lng: place.coordinates.lng,
              }}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY,
                v: 'weekly',
              }}
            >
              <Marker
                lat={place.coordinates.lat}
                lng={place.coordinates.lng}
                place={place}
                show={true}
                handleInfoWindowClose={() => {}}
                id={place.id}
              />
            </GoogleMapReact>
            <InfoWindow
                    place={place}
                    handleInfoWindowClose={() => {}}
            />
          </div>
        ))}
      </div>
    );
  };
  
export default OfficeCard;
