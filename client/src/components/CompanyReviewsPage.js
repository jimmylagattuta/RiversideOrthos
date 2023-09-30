import React, { useEffect, useState } from 'react';

const CompanyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
            date
        );

        return formattedDate;
    };
    useEffect(() => {
        const cacheKey = 'cached_yelp_reviews';

        const getCachedReviews = () => {
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                const { reviews, expiry } = JSON.parse(cachedData);
                if (expiry > Date.now()) {
                    return JSON.parse(reviews);
                } else {
                    localStorage.removeItem(cacheKey); // Remove expired cache
                }
            }
            return null;
        };

        const fetchReviews = () => {
            const url =
                process.env.NODE_ENV === 'production'
                    ? 'https://la-orthos-bdc751615c67.herokuapp.com/api/v1/pull_yelp_cache'
                    : 'http://localhost:3000/api/v1/pull_yelp_cache';

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch reviews');
                    }
                })
                .then((data) => {
                    setReviews(data);
                    setLoading(false);
                    // Cache the reviews
                    const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
                    const cachedData = JSON.stringify({
                        reviews: JSON.stringify(data),
                        expiry,
                    });
                    localStorage.setItem(cacheKey, cachedData);
                })
                .catch((err) => {
                    console.error(err);
                    setError(err.message);
                    setLoading(false);
                });
        };

        const cachedReviews = getCachedReviews();
        if (cachedReviews) {
            setReviews(cachedReviews);
            setLoading(false);
        } else {
            fetchReviews();
        }
    }, []);

    console.log('reviews', reviews);
    return (
        <div className='reviews-container'>
            <div className='review-grid'>
                {reviews.map((item, index) => {
                    if (item.user.name === "Pdub ..") {
                    } else {          
                        return (
                            <div key={index} className='single-review-container'>
                                <div className='review-top-info'>
                                    <div
                                        className='user-icon'
                                        style={{
                                            backgroundImage: `url(${item.user.image_url})`,
                                        }}>
                                        {!item.user.image_url && (
                                            <i className='fas fa-user-circle'></i>
                                        )}
                                    </div>
                                    <div className='review-name-container'>
                                        <div className='user-name'>
                                            {item.user.name}{' '}
                                            <i className='fab fa-yelp'></i>
                                        </div>
                                        <div className='review-location'>
                                            {item.location_two}
                                        </div>
                                        <div className='review-location'>
                                            <span className='review-city'>
                                                {item.location_one}
                                            </span>
                                            <span className='review-date'>
                                                Reviewed on{' '}
                                                {formatDate(item.time_created)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='review-info'>
                                    <i
                                        className='fa fa-quote-left'
                                        aria-hidden='true'></i>
                                    <i
                                        className='fa fa-quote-right'
                                        aria-hidden='true'></i>
                                    <p className='review-paragraph'>{item.text}</p>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CompanyReviewsPage;