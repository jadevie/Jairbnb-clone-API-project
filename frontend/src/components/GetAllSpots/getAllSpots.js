import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./getAllSpots.css";
import { Link } from "react-router-dom";


const GetAllSpots = () => {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    return (
        <>
            <div className="spot-container">
                {allSpots && Object.values(allSpots.allSpots).map(spot => (
                    <div className="each-spot">
                        <div className="spot-img" key={"img" + spot.id}>
                            <Link to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} alt="house" />
                            </Link>
                        </div>
                        <div className="city-avg-container">
                            <div key={"state" + spot.id}>
                                {`${spot.city}, ${spot.state}`}
                            </div>
                            <div style={{ fontWeight: "300" }} key={"rating" + spot.id}>
                                <i class="fa-solid fa-star"></i>
                                {spot.avgRating && (spot.avgRating).toFixed(1)}
                            </div>
                        </div>
                        <p style={{ fontWeight: "300" }} key={"miles" + spot.id}>91 miles away</p>
                        <p style={{ fontWeight: "300" }} key={"date" + spot.id}>Dec 10-15</p>
                        <div>
                            <span style={{ fontWeight: "bold" }} key={"price" + spot.id}>{`$${spot.price}`} </span>
                            <span style={{ fontWeight: "300" }} key={"night" + spot.id}> night</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GetAllSpots;
