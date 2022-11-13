import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./getAllSpots.css";

const GetAllSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    return (
        <>
            <div className="spot-container">
                <div className="each-spot">
                    {allSpots.Spots?.length > 0 && allSpots.Spots.map(spot => (
                        <div>
                            {spot.previewImage}
                            {`${spot.city}, ${spot.state}`}
                            {(spot.avgRating).toFixed(1)}
                            <br />
                            {spot.price}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GetAllSpots;
