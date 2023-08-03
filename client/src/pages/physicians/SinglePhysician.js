// import { Link, useParams } from 'react-router-dom';
// import { physicians } from '../../data';
const SinglePhysician = () => {
    // const renderPracticeEmphasisMobile = (practiceEmphasis) => {
    const renderPracticeEmphasisMobile = () => {
            return (
                <div className='specialties-item'>
                    renderPracticeEmphasis Function
                </div>
            );
    }
    // const renderPracticeEmphasis = (practiceEmphasis) => {
    const renderPracticeEmphasis = () => {
            return (
                <div className='specialties-item'>
                    renderPracticeEmphasis Function
                </div>
            );
    }
    
    const getCachedReviews = () => {
        return (
            <div className='single-review-container'>
                getCachedReviews Function
            </div>
        );
    };
    return (
        <div className='page-container'>
            SinglePhysician.js
            {renderPracticeEmphasis()}
            <div className='specialties-item'>
                <h4>Special Procedures</h4>
            </div>
            {renderPracticeEmphasisMobile()}
            <div className='specialties-item'>
                <h4>Special Procedures Mobile</h4>
            </div>
            {getCachedReviews()}
        </div>
    );
};

export default SinglePhysician;
