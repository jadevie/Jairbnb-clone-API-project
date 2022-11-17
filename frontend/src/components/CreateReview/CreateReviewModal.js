import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';


function CreateReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <EditSpotForm setShowModal={setShowModal} /> */}
                    {<CreateReview onComplete={() => setShowModal(false)} />}
                </Modal>
            )}
        </>
    );
}

export default CreateReviewModal;
