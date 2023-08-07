import React, { useState, useEffect } from 'react';

const ReactBackgroundCarousel = ({ children }) => {
    console.log('children', children);
    return (
        <div className='Carousel-container'>
            <img
                src={children.props.src}
                alt={children.props.alt}
                className='carousel-img'
                loading='eager'
            />
        </div>
    );
};

export default ReactBackgroundCarousel;
