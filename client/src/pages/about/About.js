import React from 'react';
import { aboutObj, aboutObjOther } from '../../data';
import './helpers/About.css';

const About = () => {
  return (
    <div className='about-div-responsive'>
      {aboutObj.map((item, index) => {
        return (
          <div className='about-div-two-responsive' key={index}>
              <img
                src="https://i.imgur.com/EBJUAgp.webp"
                alt={item.nameOne}
                id='about-div-image-responsive'
              />
              <img
                src="https://i.imgur.com/V1JENY4h.webp"
                alt="Doctor"
                id='about-div-doctor-responsive'
              />
              <div className='about-div-bulleted'>
                <p>{item.descriptionOne}</p>
                {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
                  <ul className='unordered-list-about'>
                    {item.descriptionOneBullettedList.map((bulletItem, bulletIndex) => (
                      <li key={bulletIndex}>
                        {bulletItem === 'And More!' ? <h3>{bulletItem}</h3> : <img src={bulletItem} alt={bulletItem} />}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </div>
        );
      })}


      <div></div>
    </div>
  );
};

export default About;
