import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './createReview.css';

const CreateReview = ({ onComplete }) => {
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const newReview = { stars, review };
        if (newReview) {
            return await dispatch(createReviewThunk(spotId, newReview))
                .then(() => {
                    onComplete();
                    setStars(0);
                    setReview('');
                })
                .catch(async response => {
                    const data = await response.json();
                    if (data && data.message) setErrors([data.message]);
                });
        };
    };
    return (
        <div>
            <h4 className='review-title'>Review</h4>

            <form onSubmit={handleSubmit} className='review-container'>
                <ul style={{ color: 'rgb(246, 18, 18)', paddingLeft: '10px', paddingBottom: '20px' }}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <div className='star-rating'><span>Select your rating   </span>
                    {[...Array(5)].map((star, i) => {
                        i += 1;
                        return (
                            <button
                                type='button'
                                key={i}
                                className={i <= ((stars && hover) || hover) ? 'on' : 'off'}
                                onClick={() => setStars(i)}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(stars)}
                            >
                                <span className='star'><i class="fa-solid fa-star" style={{ fontSize: '25px' }}></i></span>
                            </button>);
                    })}
                </div >
                <textarea
                    className='review-detail'
                    placeholder='Review here'
                    type='text'
                    onChange={e => setReview(e.target.value)}
                    value={review}
                />
                <button className='btn' type='submit'>Post Review</button>
            </form >
        </div >
    );
};

export default CreateReview;;
