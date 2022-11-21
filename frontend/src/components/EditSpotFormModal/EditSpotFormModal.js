import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditFormModal({ oldSpot }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='btn' onClick={() => setShowModal(true)}>Edit listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {<EditSpotForm
                        hideModal={() => setShowModal(false)}
                        oldSpot={oldSpot} />}
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
