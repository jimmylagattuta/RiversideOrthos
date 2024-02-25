import React from 'react';
import { aboutObj, aboutObjOther } from '../../data';
import './helpers/About.css';

const About = () => {
  return (
    <div className='about-parent-div'>
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
      </div>
      <div className='appointment-section'>
        {aboutObjOther.map((item, index) => (
          <div key={index} className='about-div-bulleted-bring'>
            <h2>{item.nameOne}</h2>
            <p>
              {/* Check if item.descriptionOne is a string */}
              {typeof item.descriptionOne === 'string' ? (
                // If it's a string, split it to insert the link where needed
                item.descriptionOne.split(/(OAR Patient Portal!)/).map((part, index) => (
                  part === "OAR Patient Portal!" ? (
                    <a
                      key={index}
                      className="animate-grow"
                      href="https://oar.myezyaccess.com/Patient/Main.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OAR Patient Portal!
                    </a>
                  ) : (
                    part
                  )
                ))
              ) : (
                // If it's not a string, render it as a separate element
                <React.Fragment>
                  {item.descriptionOne}
                </React.Fragment>
              )}
            </p>
            <ul className='unordered-list-about-bring'>
              {item.descriptionOneBullettedList.map((bulletItem, bulletIndex) => (
                <li key={bulletIndex}>
                  {bulletItem.startsWith('http') ? <img src={bulletItem} alt="List Item" /> : bulletItem}
                </li>
              ))}
            </ul>
            {/* Button to go to the portal */}
            <ul className='unordered-list-about-bring'>
              {/* <button
                className="portal-button"
                onClick={() => window.open("https://oar.myezyaccess.com/Patient/Main.aspx", "_blank")}
              >
                Go to Portal
              </button> */}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;