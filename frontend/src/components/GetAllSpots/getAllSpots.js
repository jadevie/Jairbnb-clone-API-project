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

    // const handleClick = e => {
    //     e.preventDefault();
    //     // dispatch spots with keyword related to each icons
    // };

    return (
        <>
            <div className="icons-container">
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg" alt="" />
                        <span className='icon-name'>New</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg" alt="" />
                        <span>Top of the world</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg" alt="" />
                        <span>Trending</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg" alt="" />
                        <span>Adapted</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg" alt="" />
                        <span>Play</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg" alt="" />
                        <span>Hanoks</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg" alt="" />
                        <span>Private rooms</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg" alt="" />
                        <span>Mansions</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg" alt="" />
                        <span>Cabins</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt="" />
                        <span>OMG!</span>
                    </span>
                </button>
                <button>
                    <span className="icon-name-container">
                        <img className="nav-icons" src=" https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="" />
                        <span>Amazing views</span>
                    </span>
                </button>
            </div>

            <div className="spot-container">
                {allSpots && Object.values(allSpots.allSpots).map(spot => (
                    < div className="each-spot" >
                        <div className="spot-img" key={"img" + spot.id}>
                            <Link to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} alt="house" className="spot-img" />
                            </Link>
                        </div>
                        <div className="city-avg-container">
                            <div key={"state" + spot.id}>
                                {`${spot.city}, ${spot.state}`}
                            </div>
                            <div style={{ fontWeight: "350" }} key={"rating" + spot.id}>
                                <i class="fa-solid fa-star" style={{ fontSize: '14px' }}></i>
                                {spot.avgRating && (spot.avgRating)}
                            </div>
                        </div>
                        <p style={{ color: '#777777', fontWeight: "300", fontSize: '15px' }} key={"miles" + spot.id}>91 miles away</p>
                        <p style={{ color: '#777777', fontWeight: "300", fontSize: '15px' }} key={"date" + spot.id}>Dec 10-15</p>
                        <div>
                            <span style={{
                                fontWeight: "bold"
                            }} key={"price" + spot.id}>{`$${spot.price}`} </span>
                            <span style={{ fontWeight: "300", fontSize: '15px' }} key={"night" + spot.id}> night</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default GetAllSpots;
