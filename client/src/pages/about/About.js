import React, { useState, useEffect } from 'react';
import { aboutObj, aboutObjOther } from '../../data';

const About = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [imagePosition, setImagePosition] = useState('left');

  useEffect(() => {
    if (!isInitialRender) {
      setImagePosition((prevPosition) => (prevPosition === 'left' ? 'right' : 'left'));
    }
    setIsInitialRender(false);
  }, [isInitialRender]);
  console.log('aboutObj', aboutObj);

  return (
    <div className="container-oar-about">
      {aboutObj.map((item, index) => {
        return (
          <div key={index} className="imageWrapperOARAbout">
            <div className="aboutImageWrapper">
              <img
                src="https://i.imgur.com/EBJUAgp.webp"
                alt={item.nameOne}
                className="altImageOARAboutBackground"
                id="aboutBackgroundForDoctor"
              />
              <img
                src="https://i.imgur.com/V1JENY4h.webp"
                alt="Doctor"
                className="altImageOARDoctor"
                id="aboutDoctor"
              />
              <div id="bullet-list-div">
          
              <p className="large rise">{item.descriptionOne}</p>
              {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
                <ul className='bullet-list-about'>
                  {item.descriptionOneBullettedList.map((bulletItem, bulletIndex) => (
                    <li key={bulletIndex}>
                      {bulletItem === 'And More!' ? <h3>{bulletItem}</h3> : <img src={bulletItem} alt={bulletItem} />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </div>
            <div id="bullet-list-div-mobile">

              <p className="large rise">{item.descriptionOne}</p>
              {item.descriptionOneBullettedList && Array.isArray(item.descriptionOneBullettedList) && (
                <ul className='bullet-list-about'>
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

      {aboutObjOther.map((item, index) => {
        return (
          <div key={index} className="imageWrapperOARAbout">
            <div className="aboutImageWrapper">
              <img
                src="https://i.imgur.com/she9M1h.webp"
                alt="Other"
                className="altImageOARAboutBackground"
              />
              <img
                src="https://i.imgur.com/lGh1bGO.webp"
                alt={item.nameOne}
                className="altImageOther"
              />
            </div>
            <div>
              {/* <h2>{item.nameOne}</h2> */}
              {/* <p>{item.descriptionOne}</p> */}
            </div>
          </div>
        );
      })}

      <div className="separator-oar-about"></div>
    </div>
  );
};

export default About;
