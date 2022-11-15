import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';

const SpotDetails = () => {
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            });
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
                <div>
                    <div>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </div>
                    <div>{spot.name}</div>
                    <div>{spot.avgStarRating}</div>
                    <div>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                    <div>
                        {user.id === spot.ownerId ? (
                            <div>
                                <button>Add more images</button>
                                <button onClick={handleRemove}>Remove listing</button>
                                <button>Edit listing</button>
                            </div>) : <div></div>}
                    </div>
                    <div>
                        {spot.SpotImages && (spot.SpotImages).map(image => (
                            <img src={image.url} alt='spot-img' />
                        ))}
                    </div>
                    <div>
                        <p> {spot.Owner && `Entire house hosted by ${spot.Owner.firstName}`}</p>
                        {/* <p> 6 guests - 2 bedrooms - 3 beds - 1 bath</p> */}
                    </div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                </div>
            </div>
        </>
    );
};

export default SpotDetails;
