import { Link, NavLink } from 'react-router-dom';
import './helpers/AboutUsComponent.css'

const AboutUsComponent = () => {
    return (
        <div className='about-container'>
            <div className='about-container-top'>
                <h1 className='about-title'>Orthopaedic Associates of Riverside</h1>
                <p className='about-description'>
                    Orthopaedic Associates of Riverside, LLC is committed to providing the highest quality of orthopaedic care possible. Along with the treatment of immediate or chronic problems, we strive to integrate the doctrine of prevention in all our treatment plans as a way to alleviate potential future difficulties. It is the goal of Orthopaedic Associates of Riverside and its employees to provide high quality, sensitive care to each and every patient, family member and/or friend we come in contact with. We fully understand and furthermore take very seriously the trust our patients put in our hands. We are committed to devoting ourselves to kindness and consideration when interacting with our patients, their family members and friends. We are pleased to have you as a patient. If you have any questions, always feel free to contact our office and our trained staff will assist you in any way possible.
                </p>
            </div>
            <div className='about-container-bottom'>
                <img className='about-container-bottom-left'
                />
                <div className='about-container-bottom-right'>
                <h2 className='about-title-right'>
                    OAR Patient Portal
                </h2>
                <p className='about-description-right'>
                    Orthopaedic Associates of Riverside is pleased to introduce the OAR Patient Portal! The Patient Portal is an electronic system that will allow you, our patients, to communicate your medical needs with our office staff and providers through a secure online system at your convenience.
                </p>
                <p className='about-description-right'>
                    To join the Patient Portal, call the office and provide our staff with your email address. Then, log on to OAR’s Patient Portal to access our patient features.
                </p>

                <p className='about-description-right'>
                    <li>
                        Expedite your check-in process by completing New Patient Forms online
                    </li>
                </p>
                <p className='about-description-right'>
                    <li>
                        Tired of waiting on hold? Schedule your appointments, order medical records, and request prescription refills electronically
                    </li>
                </p>
                <p className='about-description-right'>
                    <li>
                        Update your medical history and pay bills from the privacy of your home
                    </li>
                </p>
                <p className='about-description-right'>
                    <li>
                        Verify your insurance eligibility and review your benefits prior to your appointment
                    </li>
                </p>
                
                <div className='about-right-button'>
                    <NavLink className='btn header-button-white' to='/about-us'>
                        Learn More
                    </NavLink>
                </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsComponent;