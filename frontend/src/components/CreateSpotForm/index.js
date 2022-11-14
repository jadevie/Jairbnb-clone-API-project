import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../store/spots";
import { useHistory } from 'react-router-dom';

const CreateSpotForm = (spot) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState(''); // backend data uses name, frontend shows Title
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const spot = {
            address, city, state, country, name, description, price
        };
        console.log(spot);
        if (spot) {
            const newSpot = await dispatch(createSpotThunk(spot));
            // .catch(async response => {
            //     const data = await response.json();
            //     if (data) setErrors(Object.values(data.errors));
            // });
            history.push(`/spots/${newSpot.id}`);
            return newSpot;
        }
    };

    return (
        <div>
            <h2>Create New Listing </h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Address
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        require
                    />
                </label>
                <label>City
                    <input
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        require
                    />
                </label>
                <label>State
                    <input
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        require
                    />
                </label>
                <label>Country
                    <input
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        require
                    />
                </label>
                <label>Title
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        require
                    />
                </label>
                <label>Description
                    <input
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        require
                    />
                </label>
                <label>Price
                    <input
                        type='number'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        require
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div >
    );
};

export default CreateSpotForm;
