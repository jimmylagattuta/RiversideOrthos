import React, { useEffect, useState } from 'react';
import { useCsrfToken } from './CsrfTokenContext';

import './helpers/ReviewsHelpers.css';

const CompanyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState(false); // Debug flag to toggle logs

    const logDebug = (message, ...optionalParams) => {
        if (debug) {
            console.log(message, ...optionalParams);
        }
    };

    const doctors = [
        'Michael J. Hejna',
        'Scott A. Seymour',
        'Erling Ho',
        'Nicolas S. Anderson',
        'Samantha Adamczyk',
        'Jennifer Boyer',
        'OAR ',
        'OAR.',
        'OAR.'
    ];

    const isDoctor = (name, doctors) => {
        const normalizedInput = name.toLowerCase();
        return doctors.some(doctor => {
            const normalizedDoctor = doctor.toLowerCase();
            return normalizedDoctor.includes(normalizedInput) || normalizedInput.includes(normalizedDoctor);
        });
    };

    const defaultProfilePhotoUrls = [
      'https://lh3.googleusercontent.com/a/ACg8ocLIudbeWrIiWWZp7p9ibYtGWt7_t2sZhu3GhVETjeORZQ=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocKWoslacgKVxr6_0nu2yNq78qvJS_JmSt-o-sm0Poz1=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocIkg86HfAMs_wSjeyDfK_T6jI0hsOa7uwPSHrvQkzxz=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocJF-8tCmJylLukUi86imkat5gT8nG4xHJuweKX0g7-T6A=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocJrHYSdRq54r0T0kNF60xZGqm58qhXVIB3ogEUkGa_e=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocKWj653OujAca153BqwYSRX18G0URD-9DV89ZYyArIET1U=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocKqelNaTWLy28Vdol7ewcw8EYyT2muaWVSjckEAamoy=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocI-UUmoZ36qdH-xNh8xlrTXv3Jx6H7QGBwXeaIa8rjT=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocKPAe4Ik_kZrxRvPsJmKD3YthHHK8mHe2VDb10mPSKP=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocKZ2tCDEg6Ehy8TRlFwuuVvvdpdRnSFfeGYRNUTq1U=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocLu8PkNc-7f1HUTNd94JtS73eJhUka5AIZucTp3Hlbw=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocLfObJkOnSt9CV8D8v_u6kTqfhrE-yQPAYjosZdlzvZ=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocLUv0B3n3yJCFDAuL2h3UzH2kExs6WQRooe_A662cMB=s128-c0x00000000-cc-rp-mo-ba2',
      'https://lh3.googleusercontent.com/a/ACg8ocJicBeMj3c-YfZSzCYTrkKfT8Z3tXIMXSNKxGwU8qim=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocLKrlJ0NBUgNt_mA6fqHxuYrVbHfYy48bb-CaVg3YQC=s128-c0x00000000-cc-rp-mo-ba3',
      'https://lh3.googleusercontent.com/a/ACg8ocKww_NJw1NmlQPCb0AodayToyOTvLxgGtcfIOPuromk=s128-c0x00000000-cc-rp-mo',
      'https://lh3.googleusercontent.com/a/ACg8ocIFg5G-JO49VMdkvA4N5IwxQ9XKjHP3HHTytStrVCI=s128-c0x00000000-cc-rp-mo'
  
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    };

    const { csrfToken, setCsrfToken } = useCsrfToken();

    useEffect(() => {
        logDebug("Component mounted, initializing data fetch.");
        const cacheKey = 'cached_yelp_reviews';

        const getCachedReviews = () => {
            logDebug("Checking for cached reviews.");
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                const { reviews, expiry } = JSON.parse(cachedData);
                if (expiry > Date.now()) {
                    logDebug("Cached reviews found and valid.");
                    return JSON.parse(reviews);
                } else {
                    logDebug("Cached reviews expired, removing.");
                    localStorage.removeItem(cacheKey);
                }
            }
            return null;
        };

        const saveToCache = (data) => {
            logDebug("Saving reviews to cache.");
            const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // Cache for 7 days
            const cacheData = JSON.stringify(data);
            localStorage.setItem(cacheKey, cacheData);
        };

        const fetchReviews = () => {
            logDebug("Fetching reviews from the server.");
            const url = process.env.NODE_ENV === 'production'
                ? 'https://www.orthoriverside.com/api/v1/pull_google_places_cache'
                : 'https://www.orthoriverside.com/api/v1/pull_google_places_cache';

            const headers = {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            };

            fetch(url, { headers })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch reviews');
                }
            })
            .then((data) => {
                logDebug("Reviews fetched successfully, processing data.");
                if (Array.isArray(data.reviews)) {
                    if (data.csrf_token) {
                        setCsrfToken(data.csrf_token);
                    }

                    const filteredReviews = data.reviews.filter(item => !item.text.startsWith("Absolutely horrendous"));
                    const shuffledReviews = shuffleArray(filteredReviews);
                    const randomReviews = shuffledReviews.slice(0, 3);

                    saveToCache(data);
                    setReviews(randomReviews);
                    setLoading(false);
                } else {
                    throw new Error('Data.reviews is not an array');
                }
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

    return (
        <div className='reviews-container'>
            {reviews.map((item, index) => (
                // Render review content
            ))}
        </div>
    );
};

export default CompanyReviewsPage;
