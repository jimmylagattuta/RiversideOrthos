import { Outlet, useLocation } from 'react-router-dom';
import PagesHeader from '../../components/PagesHeader';
const Home = () => {
    return (
        <>
            <PagesHeader title='About OAR' />
            <Outlet />
        </>
    );
};
export default Home;
