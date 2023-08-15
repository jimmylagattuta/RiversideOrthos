import { useParams } from 'react-router-dom';
import { services } from '../../data';
import Error from '../Error';

const SingleService = () => {
    const { serviceId } = useParams();
    const Service = services.find(
        (product) =>
            product.name.toLowerCase().split(' ').join('-') ===
            serviceId.toLowerCase()
    );

    if (!Service) {
        return <Error />;
    }
    return (
        <div className='page-container'>
            <div className='page-top-header'>
                <div className='page-image-container'>
                    <img
                        src={Service.image}
                        alt={Service.name}
                        className='page-image'
                        
                    />
                </div>
                <div className='page-info'>
                    <h2 className='page-title'>{Service.firstTitle}</h2>
                    {Service.description.map((item, index) => {
                        return <p key={index} className='page-description'>{item}</p>;
                    })}
                </div>
            </div>

            {Service.secondTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.secondTitle}</h2>
                        {Service.descriptionTwo.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.secondTitleBulletedList && (
                <>
                    <div className='page-info'>
                        <ul className='bulleted-list'>
                            {Service.secondTitleBulletedList.map((item, index) => {
                                return <li key={index} className='page-description'>{item}</li>;
                            })}
                        </ul>
                    </div>
                </>
            )}

            {Service.descriptionAfterSecondBulletedList && (
                <>
                    {Service.descriptionAfterSecondBulletedList.map((item, index) => {
                        return <p key={index} className='page-description'>{item}</p>;
                    })}
                </>
            )}


            {Service.thirdTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.thirdTitle}</h2>
                        {Service.descriptionThree.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.thirdTitleBulletedList && (
                <>
                    <div className='page-info'>
                        <ul className='bulleted-list'>
                            {Service.thirdTitleBulletedList.map((item, index) => {
                                return <li key={index} className='page-description'>{item}</li>;
                            })}
                        </ul>
                    </div>
                </>
            )}

            {Service.descriptionAfterThirdBulletedList && (
                <>
                    {Service.descriptionAfterThirdBulletedList.map((item, index) => {
                        return <p key={index} className='page-description'>{item}</p>;
                    })}
                </>
            )}

            {Service.fourthTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.fourthTitle}</h2>
                        {Service.descriptionFour.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}
            {Service.fourthTitleBulletedList && (
                <>
                    <div className='page-info'>
                        <ul className='bulleted-list'>
                            {Service.fourthTitleBulletedList.map((item, index) => {
                                return <li key={index} className='page-description'>{item}</li>;
                            })}
                        </ul>
                    </div>
                </>
            )}
            
            {Service.descriptionAfterFourthBulletedList && (
                <>
                    {Service.descriptionAfterFourthBulletedList.map((item, index) => {
                        return <p key={index} className='page-description'>{item}</p>;
                    })}
                </>
            )}

            {Service.fifthTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.fifthTitle}</h2>
                        {Service.descriptionFive.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.sixthTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.sixthTitle}</h2>
                        {Service.descriptionSix.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

            {Service.seventhTitle && (
                <>
                    <div className='page-info'>
                        <h2 className='page-title'>{Service.seventhTitle}</h2>
                        {Service.descriptionSeven.map((item, index) => {
                            return <p key={index} className='page-description'>{item}</p>;
                        })}
                    </div>
                </>
            )}

        </div>
    );
};

export default SingleService;
