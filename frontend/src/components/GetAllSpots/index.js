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
                {allSpots.Spots?.length > 0 && allSpots.Spots.map(spot => (
                    <div className="each-spot">
                        <div className="spot-img">
                            <a href={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} alt="house" />
                            </a>
                        </div>
                        <div className="city-avg-container">
                            <div>
                                {`${spot.city}, ${spot.state}`}
                            </div>
                            <div style={{ fontWeight: "300" }}>
                                <i class="fa-solid fa-star"></i>
                                {(spot.avgRating).toFixed(1)}
                            </div>
                        </div>
                        <p style={{ fontWeight: "300" }}>91 miles away</p>
                        <p style={{ fontWeight: "300" }}>Dec 10-15</p>
                        <div>
                            <span style={{ fontWeight: "bold" }}>{`$${spot.price}`} </span>
                            <span style={{ fontWeight: "300" }}> night</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GetAllSpots;
