import { Link } from 'react-router-dom';
import { aboutObj } from '../../data';
const About = () => {
    return (
        <div className='page-container'>
            <div className='about-content'>
                {aboutObj.map((item, index) => {
                    return (
                        <div key={index} className='about-info'>
                            <h2>{item.nameOne}</h2>
                            <p className='about-description'>
                                {item.descriptionOne}
                            </p>
                            {/* <div className='about-image-container'>
                                <img
                                    src={item.imageOne}
                                    alt={item.nameOne}
                                    className='about-image'
                                />
                            </div> */}
                            <div className="popout-content">

                                {item.descriptionTwo.map((itemTwo, index) => {
                                    return (
                                        <p key={index} className='about-description'>
                                            {itemTwo}
                                        </p>
                                    );
                                })}

                                {/* <div className='about-image-container'>
                                    <img
                                        src={item.imageTwo}
                                        alt={item.descriptionTwo}
                                        className='about-image'
                                    />
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default About;
