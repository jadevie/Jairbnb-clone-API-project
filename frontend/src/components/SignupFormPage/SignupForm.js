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
                .then(() => setShowModal(false))
                .catch(async res => {
                    const data = await res.json();
                    if (data) setErrors(Object.values(data.errors));
                });
        };
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div>
            <h2 className='sign-up'>Sign Up</h2>
            <form onSubmit={handleSubmit} className='signup-form'>
                <ul className='error-render'>{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
                <input
                    placeholder=' First Name'
                    type='text'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    className='signup-input border'
                />
                <input
                    placeholder=' Last Name'
                    type='text'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    required
                    className='signup-input'
                />
                <input
                    placeholder=' Email'
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                    className='signup-input'
                />
                <input
                    placeholder=' Username'
                    type='text'
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    required
                    className='signup-input'
                />
                <input
                    placeholder=' Password'
                    type='password'
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    className='signup-input'
                />
                <input
                    placeholder=' Confirm Password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    className='signup-input border-bottom'
                />
                <button type='submit' className='signup-btn'>Sign up</button>

            </form >
        </div >
    );
};

export default SignupFormPage;
