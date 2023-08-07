import React, { useState, useEffect } from 'react';

const ReactBackgroundCarousel = ({ children }) => {
    const [counter, setCounter] = useState(1);
    const [pause, setPause] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);
    const [isFirstSlide, setIsFirstSlide] = useState('first-slide');
    const [carouselInterval, setCarouselInterval] = useState(2500);
    const content = children;

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
