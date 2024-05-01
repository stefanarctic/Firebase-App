import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { logOut } from './Auth';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.currentUser)
        {
            navigate('/login');
        }
    }, [])

    return (
        auth.currentUser && (
            <div className="home">
                <h3>Logged in as {auth.currentUser.displayName}</h3>
                <button onClick={() => {
                    logOut();
                    navigate('/login');
                }}>Log Out</button>
            </div>
        )
    );
}

export default Home;