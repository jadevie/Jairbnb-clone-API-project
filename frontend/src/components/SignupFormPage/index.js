import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupFormPage = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
            return dispatch(sessionActions.signupUserThunk({ firstName, lastName, email, username, password }))
                .then(setShowModal(false))
                .catch(async res => {
                    const data = await res.json();
                    if (data) setErrors(Object.values(data.errors));
                });
        };
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <ul>{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
                <label>First Name
                    <input
                        type='text'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                </label>
                <label>Last Name
                    <input
                        type='text'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                </label>
                <label>Email
                    <input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </label>
                <label>Username
                    <input
                        type='text'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                </label>
                <label>Confirm password
                    <input
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    );
};

export default SignupFormPage;
