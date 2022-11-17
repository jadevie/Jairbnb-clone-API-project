import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';

const CreateReview = ({ onComplete }) => {
    const [stars, setStars] = useState(0);
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
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        };
    };
    return (
        <div>
            <h4>Review</h4>
            <form onSubmit={handleSubmit} >
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Select your rating
                    <input
                        type='text'
                        onChange={e => setStars(e.target.value)}
                        value={stars}
                    />
                </label>
                <textarea
                    placeholder='Review here'
                    type='text'
                    onChange={e => setReview(e.target.value)}
                    value={review}
                />
                <button type='submit'>Post Review</button>
            </form>
        </div>
    );
};

export default CreateReview;;
