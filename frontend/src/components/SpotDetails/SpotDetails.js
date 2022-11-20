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
    let reviewFromUser;
    if (user) {
        reviewFromUser = reviewsArray.find(review => review.userId === user.id);
    }

    console.log(reviewFromUser);
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

    }, [dispatch, spotId, avgRating]);

    const handleRemove = e => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId));
        window.alert("Sucessfully deleted listing");
        history.push(`/`);
    };

    return (
        <>
            <div className='detail-page'>
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
                                <i className="fa-solid fa-star" style={{
                                    fontSize: '12px', paddingTop: '2px'
                                }}></i>
                                <div style={{ paddingLeft: '5px', paddingRight: '20px' }}>  {spot.avgStarRating && `${avgRating} - ${reviewsArray.length} reviews `}</div>

                                <i className="fa-solid fa-chess-pawn"></i>
                                <div style={{ paddingLeft: '5px', paddingRight: '20px', fontWeight: '400' }}>Superhost </div>
                                {`${spot.city}, ${spot.state}, ${spot.country}`}
                            </div>
                            <div>
                                {user && user.id === spot.ownerId ? (
                                    <div className='remove-edit-listing-container'>
                                        <div>
                                            <button onClick={handleRemove} className='btn'>Remove listing</button>
                                        </div>
                                        <div>
                                            <EditFormModal oldSpot={spot} />
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
                            <div className='price'>{`$${spot.price}`}<span style={{ fontWeight: 400, fontSize: '16px', color: '#3c3c3c' }}> night</span>
                            </div>
                        </div>

                        <div className='more-info-border'>
                            <div className='more-info-container'>
                                <i className="fa-solid fa-chess-pawn" style={{ paddingRight: '20px', fontWeight: '300', fontSize: '20px' }}></i>
                                <div>
                                    <p className='more-info-title'>{spot.Owner && `${spot.Owner.firstName} is a Superhost`}</p>
                                    <p className='more-info-p'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                </div>
                            </div>

                            <div className='more-info-container'>
                                <i class="fa-solid fa-key" style={{ paddingRight: '20px', fontSize: '18px' }}></i>
                                <div>
                                    <p className='more-info-title'>Great check-in experience</p>
                                    <p className='more-info-p'>100% of recent guests gave the check-in process a 5-star rating.</p>
                                </div>

                            </div>

                            <div className='more-info-container'>
                                <i class="fa-regular fa-calendar" style={{ paddingRight: '20px', fontWeight: '300', fontSize: '18px' }}></i>
                                <p className='more-info-title'>Free cancellation for 48 hours.</p>
                            </div>


                        </div>
                        <div className='aircover'>
                            <h2 style={{ color: '#ff375c', fontSize: '32px', marginLeft: '-20px' }}>air<span style={{ color: '#222' }}>cover</span></h2>
                            <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>

                        <div className='spot-des'>{spot.description}</div>
                    </div>
                </div>

                <div className='review-layout'>
                    <i className="fa-solid fa-star" style={{ fontSize: '12px', padding: '5px' }}></i>
                    {spot.avgStarRating && `${avgRating} - ${reviewsArray.length} reviews`}
                    <div className='leave-review'>
                        {(user && !reviewFromUser) && <CreateReviewModal />}
                    </div>
                </div>

                <div className='review-content'>
                    {reviewsArray.length > 0 && reviewsArray.map(review => (
                        <div className='review-list'>
                            <li>{review.review}</li>

                            {user && user.id === review.userId ? (
                                <button className='review-btn' onClick={e => {
                                    e.preventDefault();
                                    dispatch(deleteReviewThunk(review.id));
                                }}>Remove review
                                </button>) : null}
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default SpotDetails;
