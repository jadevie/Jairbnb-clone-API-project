import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';
import EditFormModal from '../EditSpotFormModal/EditSpotFormModal';
import { deleteReviewThunk, getReviewsThunk } from '../../store/reviews';
import CreateReviewModal from '../CreateReview/CreateReviewModal';
import './SpotDetails.css';
import ErrorPage from '../ErrorPage/ErrorPage';



const SpotDetails = () => {

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews);
    const reviewsArray = Object.values(reviews.spotReviews);

    let sum = 0;
    let avgRating = 0;
    reviewsArray.forEach(review => {
        sum += review.stars;
        avgRating = (sum / reviewsArray.length).toFixed(1);
    });

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            });

        dispatch(getReviewsThunk(spotId));

    }, [dispatch, spotId]);

    const handleRemove = e => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId));
        window.alert("Sucessfully deleted listing");
        history.push(`/`);
    };

    return (
        <>
            <div>
                {/* {Object.keys(spot).length === 0 ? (<Redirect to='/404' />) : null} */}
                <div>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className='spot-detail-container'>
                    <div className='title'>
                        {spot.name}
                    </div>
                    <div className='first-detail-container'>
                        <div className='brief-detail'>
                            <i className="fa-solid fa-star" style={{ fontSize: '12px' }}></i>
                            {spot.avgStarRating && `${avgRating} - ${reviewsArray.length} reviews - `}
                            {`${spot.city}, ${spot.state}, ${spot.country}`}
                        </div>
                        <div>
                            {user && user.id === spot.ownerId ? (
                                <div className='remove-edit-listing-container'>
                                    <div>
                                        <button onClick={handleRemove} className='btn'>Remove listing</button>
                                    </div>
                                    <div>
                                        <EditFormModal />
                                    </div>
                                </div>) : null}
                        </div>
                    </div>
                    <div className='image-container'>
                        <div className='default-img-container'>
                            {spot.SpotImages && (spot.SpotImages).map(image => (
                                image.preview === true ?
                                    <div>
                                        <img src={image.url} alt='default' className='default-img' />
                                    </div>
                                    : null
                            ))}
                        </div>
                        <div className='other-img-container'>
                            {spot.SpotImages && (spot.SpotImages).map(image => (
                                image.preview === false ?
                                    <div className='each-img-container'>
                                        <img src={image.url} alt='spot' className='other-img' />
                                    </div> : null
                            ))}
                        </div>
                    </div>
                    <div className='spot-content'>
                        <div>
                            <p className='owner-content'> {spot.Owner && `Entire house hosted by ${spot.Owner.firstName}`}</p>
                            <p className='house-content'>6 guests - 2 bedrooms - 3 beds - 1 bath</p>
                        </div>
                        <div className='price'>{`$${spot.price}`}<span style={{ fontWeight: 400, fontSize: '16px' }}> per night</span>
                        </div>
                    </div>
                    <div className='spot-des'>{spot.description}</div>
                </div>
            </div>

            <div className='review-layout'>
                <i className="fa-solid fa-star" style={{ fontSize: '12px' }}></i>
                {spot.avgStarRating && `${avgRating} - ${reviewsArray.length} reviews`}
            </div>

            <div>
                {reviewsArray.length > 0 && reviewsArray.map(review => (
                    <div className='review-content'>
                        <li>{review.review}</li>
                        {user && user.id === review.userId ? (
                            <button className='btn' onClick={e => {
                                e.preventDefault();
                                dispatch(deleteReviewThunk(review.id));
                            }}>Remove review</button>) : null}
                    </div>
                ))}
            </div>

            <div className='leave-review'>
                <CreateReviewModal />
            </div>
        </>

    );
};

export default SpotDetails;
