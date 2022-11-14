import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spots";
createSpot;

import React from 'react';

const CreateSpotForm = (spot) => {
    const dispatch = useDispatch();
    const handleSubmit = e => {

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>Create New Listing
                <label>
                    <input>
                    </input>
                </label>
                <label>
                    <input>
                    </input>
                </label>
                <label>
                    <input>
                    </input>
                </label>
                <label>
                    <input>
                    </input>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateSpotForm;
