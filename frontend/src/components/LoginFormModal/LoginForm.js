import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

const LoginForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.loginUserThunk({ credential, password }))
            .then(() => setShowModal(false))
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            });
    };

    const loginDemo = e => {
        e.preventDefault();
        return dispatch(sessionActions.loginUserThunk({
            credential: 'Demo-lition',
            password: 'password'
        }))
            .then(() => setShowModal(false));
    };

    return (
        <>
            <div >
                <h3>Log in or sign up</h3>
                <h2>Welcome to Jairbnb</h2>
                <form onSubmit={handleSubmit} className='login-form'>
                    <ul className='error-render'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>

                    <input
                        placeholder=' Username or Email'
                        type='text'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                        className='input border-top'
                    />
                    <input
                        placeholder=' Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className='input border-bottom'
                    />
                    <button type='submit' className='login-btn'>Log In</button>
                    <button onClick={loginDemo} className='login-btn'>Log in as Demo User</button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
