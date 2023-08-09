import React, { useState, useEffect } from 'react';

const ReactBackgroundCarousel = ({ children }) => {
    const [counter, setCounter] = useState(1);
    const [pause, setPause] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]);
    const [isFirstSlide, setIsFirstSlide] = useState('first-slide');
    const [carouselInterval, setCarouselInterval] = useState(2500);
    const content = children;
    // Function to preload an image
    const preloadImage = (url) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            setLoadedImages((prevLoadedImages) => [...prevLoadedImages, url]);
        };
    };

    useEffect(() => {
        // Eager load the first image
        if (content.length > 0) {
            const firstImageSrc = content[0].props.src;
            preloadImage(firstImageSrc);
        }
    }, [content]);

    const handleNext = () => {
        if (counter !== content.length) {
            setCounter(counter + 1);
            if (isFirstSlide) {
                setIsFirstSlide('');
                setCarouselInterval(4000);
            }
        } else {
            setCounter(1);
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (!pause) {
                handleNext();
            } else {
                clearInterval(interval);
            }
        }, carouselInterval);
        return () => clearInterval(interval);
    });

    return (
        <div className='Carousel-container'>
            <div className={`slide ${isFirstSlide}`}>
                {children.map((item, index) => (
                    <div
                        className={counter - 1 === index ? 'show' : 'not-show'}
                        key={index}>
                        {loadedImages.includes(item.props.src) ? (
                            <img
                                src={item.props.src}
                                alt={item.props.alt}
                                className='carousel-img'
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                        ) : (
                            item
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReactBackgroundCarousel;
