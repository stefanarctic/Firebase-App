import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
    const navigate = useNavigate();
    navigate('/');
    return (
        <></>
    );
}
 
export default HomeRedirect;