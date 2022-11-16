import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';
import EditSpotForm from '../EditSpotFormModal/EditSpotForm';
import { Modal } from '../../context/Modal';
import EditFormModal from '../EditSpotFormModal/EditSpotFormModal';


const SpotDetails = () => {
    // const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
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
                    <EditFormModal />
                    <div>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </div>
                    {/* {showModal && <Modal onClose={() => setShowModal(false)}>
                        <EditSpotForm setShowModal={() => setShowModal(false)} />
                        <EditSpotForm onClose={setShowModal} />
                    </Modal>} */}
                    <div>{spot.name}</div>
                    <div>{spot.avgStarRating}</div>
                    <div>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                    <div>
                        {user && user.id === spot.ownerId ? (
                            <div>
                                <button onClick={handleRemove}>Remove listing</button>
                            </div>) : <div></div>}
                    </div>
                    <div>
                        {spot.SpotImages && (spot.SpotImages).map(image => (
                            <img src={image.url} />
                        ))}
                    </div>
                    <div>
                        <p> {spot.Owner && `Entire house hosted by ${spot.Owner.firstName}`}</p>
                        <p> 6 guests - 2 bedrooms - 3 beds - 1 bath</p>
                    </div>
                    <div>{spot.description}</div>
                    <div>{spot.price}</div>
                </div>
            </div>
        </>
    );
};

export default SpotDetails;