import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <>
            <div className='error-page'>
                < h1 className='oops' > Oops!</h1 >
                <p className='explain'>We can't seem to find the page you're looking for.</p>
                <p className='error-code'>Error code: 404</p>
                <Link to='/' className='link-to-home'>Back to home</Link>
            </div>
        </>
    );
};

export default ErrorPage;
