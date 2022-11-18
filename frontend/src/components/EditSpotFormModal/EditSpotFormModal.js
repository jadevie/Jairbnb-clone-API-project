import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

function EditFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='btn' onClick={() => setShowModal(true)}>Edit listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <EditSpotForm setShowModal={setShowModal} /> */}
                    {<EditSpotForm onComplete={() => setShowModal(false)} />}
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
