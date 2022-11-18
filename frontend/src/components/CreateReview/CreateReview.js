import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './createReview.css';

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
            <h4 className='review-title'>Review</h4>
            <form onSubmit={handleSubmit} className='review-container'>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='select-rating'>Select your rating
                    <select
                        type='number'
                        onChange={e => setStars(e.target.value)}
                        value={stars} >
                        <option key='1' value={1} >1</option>
                        <option key='2' value={2} >2</option>
                        <option key='3' value={3} >3</option>
                        <option key='4' value={4} >4</option>
                        <option key='5' value={5} >5</option>
                    </select>
                </label>
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
