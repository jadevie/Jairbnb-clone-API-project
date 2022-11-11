import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LogInFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.loginUserThunk({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) setErrors(data.message);
            });
    };

    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={onSubmit}>
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
            </form>
        </div>
    );
};

export default LogInFormPage;
