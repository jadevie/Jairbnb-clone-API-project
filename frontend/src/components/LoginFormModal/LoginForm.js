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
            <div>
                <h2>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>Username or Email
                        <input
                            type='text'
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type='submit'>Log In</button>
                    <button onClick={loginDemo}>Log in as Demo User</button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
