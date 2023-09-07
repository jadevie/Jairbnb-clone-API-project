import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editSpotThunk, getSpotDetailsThunk } from '../../store/spots';
import './editSpotForm.css';

const EditSpotForm = (props) => {
    const { hideModal, oldSpot } = props;
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots);
    const id = spot.singleSpot.id;

    const [address, setAddress] = useState(oldSpot.address);
    const [city, setCity] = useState(oldSpot.city);
    const [state, setState] = useState(oldSpot.state);
    const [country, setCountry] = useState(oldSpot.country);
    const [name, setName] = useState(oldSpot.name);
    const [description, setDescription] = useState(oldSpot.description);
    const [price, setPrice] = useState(oldSpot.price);
    const [errors, setErrors] = useState([]);

    const handleSubmitChange = async e => {
        e.preventDefault();
        setErrors([]);
        const editedSpot = { address, city, state, country, name, description, price };

        await dispatch(editSpotThunk(editedSpot, id))
            .then(() => hideModal())
            .catch(async response => {
                const data = await response.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
        dispatch(getSpotDetailsThunk(id));
    };

    // 2nd way to write:
    //     try {
    //         await dispatch(editSpotThunk(editSpot, id));
    //         hideModal();
    //         dispatch(getSpotDetailsThunk(id));
    //     }
    //     catch (response) {
    //         const data = await response.json();
    //         if (data && data.errors) setErrors(Object.values(data.errors));
    //     }
    // };

    return (
        <>
            <h2>Edit your spot</h2>
            <div >
                <div style={{ color: 'red', paddingLeft: '40px' }}>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>
                <div>
                    <form onSubmit={handleSubmitChange} className='editListing-form'>
                        <label>Address
                            <input
                                type='text'
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                required
                                className="edit-input"
                            />
                        </label>
                        <label>City
                            <input
                                type='text'
                                onChange={e => setCity(e.target.value)}
                                value={city}
                                required
                                className="edit-input"
                            />
                        </label>
                        <label>State
                            <input
                                type='text'
                                onChange={e => setState(e.target.value)}
                                value={state}
                                required
                                className="edit-input"
                            />
                        </label>
                        <label>Country
                            <input
                                type='text'
                                onChange={e => setCountry(e.target.value)}
                                value={country}
                                required
                                className="edit-input"
                            />
                        </label>
                        <label>Title
                            <input
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                required
                                className="edit-input"
                            />
                        </label>
                        <label>Description
                            <textarea
                                type='text'
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                required
                                className="edit-input description"
                            />
                        </label>
                        <label>Price
                            <input
                                type='number'
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                                required
                                className="edit-input"
                            />
                        </label>
                        <button type='submit' className='submit-btn'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditSpotForm;
