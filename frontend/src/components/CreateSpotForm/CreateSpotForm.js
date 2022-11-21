import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSpotImageThunk, createSpotThunk } from "../../store/spots";
import { useHistory } from 'react-router-dom';
import './createSpotForm.css';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState(''); // backend data uses name, frontend shows Title
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        const spot = { address, city, state, country, name, description, price };
        const image = { url, preview };
        if (spot) {
            const newSpot = await dispatch(createSpotThunk(spot))
                .catch(async response => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
            if (newSpot) {
                const id = newSpot.id;
                const imgComingSoon = {
                    url: "https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg",
                    preview: 'false'
                };
                await dispatch(addSpotImageThunk(image, id));
                dispatch(addSpotImageThunk(imgComingSoon, id));
                dispatch(addSpotImageThunk(imgComingSoon, id));
                dispatch(addSpotImageThunk(imgComingSoon, id));
                dispatch(addSpotImageThunk(imgComingSoon, id))
                    .catch(async response => {
                        const data = await response.json();
                        if (data && data.errors) setErrors(Object.values(data.errors));
                    });
                history.push(`/spots/${newSpot.id}`);
            }
        }
    };

    return (
        <div className="new-listing-container">
            <h2 id='createListingTitle'>Create New Listing </h2>
            <form onSubmit={handleSubmit} className='createListing-form'>
                <ul style={{ color: 'rgb(246, 18, 18)', paddingLeft: '40px', paddingTop: '40px' }}>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='label'> Address
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                        className="create-input"
                    />
                </label>
                <label className='label'> City
                    <input
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className="create-input"
                    />
                </label>
                <label className='label'> State
                    <input
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                        className="create-input"
                    />
                </label >
                <label className='label'> Country
                    <input
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className="create-input"
                    />
                </label>
                <label className='label'> Title
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="create-input"
                    />
                </label>
                <label className='label'> Description
                    <textarea
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className="create-input description"
                    />
                </label>
                <label className='label'> Price
                    <input
                        type='number'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        className="create-input"
                    />
                </label>
                <label className='label'> Preview Image
                    <input
                        type='url'
                        value={url}
                        onChange={e => {
                            setUrl(e.target.value);
                            setPreview(true);
                        }}
                        required
                        className="create-input"
                    />
                </label>
                <button type="submit" className="create-btn">Create</button>
            </form>
        </div >
    );
};

export default CreateSpotForm;
