import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

export const logOut = () => {
    signOut(auth)
        .then(() => console.log('Logged out successfully'))
        .catch(error => console.error(error));
}

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState('');
    const [statusVisibility, setStatusVisibility] = useState(false);

    const navigate = useNavigate();

    const timeoutIDs = [];
    const statusTime = 5000;
    const showStatus = s => {
        setStatusVisibility(true);
        setStatus(s);
        timeoutIDs.map(id => clearTimeout(id));
        const tID = setTimeout(() => {
            setStatus('');
            setStatusVisibility(false);
        }, statusTime);
        timeoutIDs.push(tID);
        console.log(timeoutIDs);
    }

    // const signInCooldown = 2;
    // const signInDates = [];

    document.onkeydown = e => {
        if (e.key === 'Escape') {
            if (auth.currentUser) {
                alert(`Logged in as ${auth.currentUser.displayName}`);
            }
            else {
                alert('Not logged in');
            }
        }
    }

    const signIn = e => {
        e.preventDefault();

        /*
        let tooFast;
        if(signInDates.length !== 0)
        {
            const currentDate = new Date();
            const pastDate = signInDates[signInDates.length - 1];
            if(currentDate.getFullYear() === pastDate.getFullYear()
                && currentDate.getMonth() === pastDate.getMonth()
                && currentDate.getDay() === pastDate.getDay()
                && currentDate.getHours() === pastDate.getHours()
                && currentDate.getMinutes() === pastDate.getMinutes()
                && currentDate.getSeconds() - pastDate.getSeconds() < signInCooldown)
            {
                tooFast = true;
                signInDates = [];
                signInDates.push(currentDate);
            }
            else
            {
                tooFast = false;
                signInDates = [];
            }
        }
        else
        {
            signInDates.push(new Date());
            tooFast = false;
        }

        if(tooFast)
        {
            showStatus('Too fast!');
            return;
        }
        */

        createUserWithEmailAndPassword(auth, email, password)
            .then(e => {
                console.log(`Created user with the email ${e.user.email} and the password ${password.split('').map(c => '*').join('')}`)
                showStatus('Account created!');

                const userEmail = '' + e.user.email;
                // Split at @
                let userName = userEmail.split('@')[0];
                // Remove numbers
                const isLetter = (c) => {
                    // const aCode = 'a'.charCodeAt(0);
                    // const zCode = 'z'.charCodeAt(0);
                    // const cCode = c.charCodeAt(0);
                    // return (cCode >= aCode && cCode <= zCode);
                    return c.toLowerCase() != c.toUpperCase();
                }
                userName = userName.split('').filter(c => isLetter(c)).join('');
                console.log(`Logged in as ${userName}`);
                // Capitalize
                // userName[0].toUpperCase();
                e.user.displayName = userName;

                navigate('/');
                // alert(auth.currentUser.email);
            })
            .catch(err => {
                if (err instanceof FirebaseError) {
                    const errorCode = err.code;
                    console.log(errorCode);
                    if (errorCode === 'auth/invalid-email') {
                        console.error('Invalid email!');
                        showStatus('Invalid email!');
                    }
                    else if (errorCode === 'auth/email-already-in-use') {
                        console.error('Email already in use!');
                        showStatus('Email already in use!');
                    }
                }
                console.error(err);
            })

    }

    return (
        <>
            <div className="auth-section">
                <form autoComplete='off'>
                    {/* <label htmlFor="email-input">Email</label> */}
                    <input className="form-element" name="email-input" type="text" onChange={e => setEmail(e.target.value)} autoComplete='off' placeholder="Enter email..." />
                    {/* <label htmlFor="password-input">Password</label> */}
                    <input className="form-element" name="password-input" type="password" onChange={e => setPassword(e.target.value)} autoComplete='off' placeholder="Enter password..." />
                    <button onClick={signIn}>Login</button>
                </form>
            </div>
            <div id='status-text-parent'>
                <h3 id='status-text'>{statusVisibility && status}</h3>
            </div>
        </>
    );
}