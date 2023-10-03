import React, { useEffect, useState } from 'react';

const CompanyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultProfilePhotoUrls = [
        'https://lh3.googleusercontent.com/a/ACg8ocLIudbeWrIiWWZp7p9ibYtGWt7_t2sZhu3GhVETjeORZQ=s128-c0x00000000-cc-rp-mo',
        'https://lh3.googleusercontent.com/a/ACg8ocKWoslacgKVxr6_0nu2yNq78qvJS_JmSt-o-sm0Poz1=s128-c0x00000000-cc-rp-mo',
        'https://lh3.googleusercontent.com/a/ACg8ocIkg86HfAMs_wSjeyDfK_T6jI0hsOa7uwPSHrvQkzxz=s128-c0x00000000-cc-rp-mo',
        'https://lh3.googleusercontent.com/a/ACg8ocJF-8tCmJylLukUi86imkat5gT8nG4xHJuweKX0g7-T6A=s128-c0x00000000-cc-rp-mo',
        '"https://lh3.googleusercontent.com/a/ACg8ocJrHYSdRq54r0T0kNF60xZGqm58qhXVIB3ogEUkGa_e=s128-c0x00000000-cc-rp-mo"'
    ];
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
                    ? 'https://la-orthos-bdc751615c67.herokuapp.com/api/v1/pull_google_places_cache'
                    : 'http://localhost:3000/api/v1/pull_google_places_cache';

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch reviews');
                    }
                })
                .then((data) => {
                    // Filter reviews with the default profile photo URLs
                    const filteredReviews = data.filter(
                        (item) =>
                            !defaultProfilePhotoUrls.includes(
                                item.profile_photo_url
                            )
                    );
                    setReviews(filteredReviews);
                    setLoading(false);
                    // Cache the reviews
                    const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
                    const cachedData = JSON.stringify({
                        reviews: JSON.stringify(filteredReviews),
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
                    console.log('item', item);
                    return (
                        <div key={index} className='single-review-container'>
                            <div className='review-top-info'>
                                <div
                                    className='user-icon'
                                    style={{
                                        backgroundImage: `url(${item.profile_photo_url})`,
                                    }}>
                                    {!item.profile_photo_url && (
                                        <i className='fas fa-user-circle'></i>
                                    )}
                                </div>
                                <div className='review-name-container'>
                                    <div className='user-name'>
                                        {item.author_name}{' '}
                                        <i className='fab fa-yelp'></i>
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
                })}
            </div>
        </div>
    );
};

export default CompanyReviewsPage;
