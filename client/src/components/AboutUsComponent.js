import { Link, NavLink } from 'react-router-dom';

const AboutUsComponent = () => {
    return (
        <div className='about-container'>
            <div className='about-container-top'>
                <h1 className='about-title'>Los Angeles Orthopedic Surgery Specialists</h1>
                <p className='about-description'>
                    Orthopedics located in East Los Angeles and Downtown Los Angeles, Los Angeles, San Gabriel Valley, Santa Fe Springs, San Fernando Valley, Tarzana, San Fernando Valley, Encino, Santa Clarita, Newhall, San Gabriel Valley, Montebello and Glendale, CA
                </p>
            </div>
            <div className='about-container-bottom'>
                <img alt="About Bottom Left" className='about-container-bottom-left'
                />
                <div className='about-container-bottom-right'>
                <h2 className='about-title-right'>
                    About Los Angeles Orthopedic Surgery Specialists
                </h2>
                <p className='about-description-right'>
                    Los Angeles Orthopedic Surgery Specialists is dedicated to delivering compassionate, high-quality orthopedic care aimed at fostering lifelong well-being for our patients.
                </p>
                <p className='about-description-right'>
                    Our team of experienced medical providers serves patients across the Los Angeles area, with offices located in East Los Angeles, Wilshire, Santa Fe Springs, Tarzana, Encino, Valencia, and Montebello, California.
                </p>
                <p className='about-description-right'>
                    Recognizing that every patient is unique, Los Angeles Orthopedic Surgery Specialists takes a tailored approach to ensure that each individual fully comprehends their condition and personalized treatment plan. Additionally, we provide preventive and podiatric care to enhance patients' comfort and enable more active lifestyles.
                </p>
                <div className='about-right-button'>
                    <NavLink className='btn header-button-white' alt="Learn More about Los Angeles Orthopedic Specialists" aria-label="Learn More Los Angeles Orthopedic Specialists" to='/about-us'>
                        Learn More
                    </NavLink>
                </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsComponent;
