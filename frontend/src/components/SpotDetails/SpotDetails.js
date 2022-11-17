import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';
import EditFormModal from '../EditSpotFormModal/EditSpotFormModal';
import { deleteReviewThunk, getReviewsThunk } from '../../store/reviews';
import CreateReviewModal from '../CreateReview/CreateReviewModal';
import './SpotDetails.css';



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
            <div >
                <div>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div className='spot-detail-container'>
                    <div>
                        {spot.name}
                    </div>
                    <div className='first-detail-container'>
                        <div>
                            <i className="fa-solid fa-star" style={{ fontSize: '12px' }}></i>
                            {spot.avgStarRating && `${(spot.avgStarRating).toFixed(1)} - ${reviewsArray.length} reviews - `}
                            {`${spot.city}, ${spot.state}, ${spot.country}`}
                        </div>
                        <div>
                            {user && user.id === spot.ownerId ? (
                                <div className='remove-edit-listing-container'>
                                    <div>
                                        <button onClick={handleRemove}>Remove listing</button>
                                    </div>
                                    <div>
                                        <EditFormModal />
                                    </div>
                                </div>) :
                                <div></div>}
                        </div>
                    </div>
                    <div className='image-container'>
                        <div>
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
                                    <div>
                                        <img src={image.url} alt='spot' className='other-img' />
                                    </div> : null
                            ))}
                        </div>
                    </div>
                    <div>
                        <p> {spot.Owner && `Entire house hosted by ${spot.Owner.firstName}`}</p>
                        <p> 6 guests - 2 bedrooms - 3 beds - 1 bath</p>
                    </div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                </div>
            </div>
            <div>{spot.avgStarRating ?
                `${spot.avgStarRating} - ${reviewsArray.length} reviews` :
                `0 -${reviewsArray.length} reviews `}</div>
            <div>
                {reviewsArray.length > 0 && reviewsArray.map(review => (
                    <div>
                        <li>{review.stars}</li>
                        <li>{review.review}</li>
                        {user && user.id === review.userId ? (
                            <button onClick={e => {
                                e.preventDefault();
                                dispatch(deleteReviewThunk(review.id));
                            }}>Remove review</button>) : null}
                    </div>
                ))}
            </div>
            <div>
                <CreateReviewModal />
            </div>
        </>
    );
};

export default SpotDetails;
