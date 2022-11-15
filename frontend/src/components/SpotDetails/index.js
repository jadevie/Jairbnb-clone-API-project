import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotDetails, getSpotDetailsThunk } from '../../store/spots';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots);
    console.log("__________", spot);

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
    }, [dispatch]);


    return (
        <>
            {/* <div>{spot.SpotImages}</div> */}
            <div>{spot.name}</div>
            <div>{spot.avgStarRating}</div>
            <div>{spot.city}</div>
            <div>{spot.state}</div>
            <div>{spot.country}</div>
            <div>{spot.description}</div>
            <div>{spot.price}</div>

        </>
    );
};

export default SpotDetails;
