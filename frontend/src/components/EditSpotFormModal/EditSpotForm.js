import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpotThunk } from '../../store/spots';

const EditSpotForm = ({ onComplete }) => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);
    const spot = useSelector(state => state.spots);
    const id = spot.singleSpot.id;
    // const spotImagesArray = spot.singleSpot.SpotImages;
    // const spotImages = spotImagesArray.map(image => image.url);

    const handleSubmitChange = e => {
        e.preventDefault();
        setErrors([]);
        const editedSpot = { address, city, state, country, name, description, price };

        const newData = dispatch(editSpotThunk(editedSpot, id))
            .then(() => onComplete())
            .catch(async response => {
                const data = await response.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
        return newData;
    };

    return (
        <>
            <h2>Edit your spot</h2>
            <div>
                {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </div>
            <div>
                <form onSubmit={handleSubmitChange}>
                    <label>Address
                        <input
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            required
                        />
                    </label>
                    <label>City
                        <input
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            required
                        />
                    </label>
                    <label>State
                        <input
                            type='text'
                            onChange={e => setState(e.target.value)}
                            value={state}
                            required
                        />
                    </label>
                    <label>Country
                        <input
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            required
                        />
                    </label>
                    <label>Title
                        <input
                            type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </label>
                    <label>Description
                        <input
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </label>
                    <label>Price
                        <input
                            type='number'
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
};
export default EditSpotForm;
