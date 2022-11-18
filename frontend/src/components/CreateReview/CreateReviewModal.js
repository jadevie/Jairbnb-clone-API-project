import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';


function CreateReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='review-btn' onClick={() => setShowModal(true)}>Leave Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {<CreateReview onComplete={() => setShowModal(false)} />}
                </Modal>
            )}
        </>
    );
}

export default CreateReviewModal;
