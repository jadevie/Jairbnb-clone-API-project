import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { DeleteBookingForm } from './DeleteBookingForm';

export const DeleteBookingModal = ({ id, totalBookings, setTotalBooking }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button className='btn' onClick={() => setShowModal(true)}></button>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <DeleteBookingForm
                    id={id}
                    hideModal={() => setShowModal(false)}
                    totalBookings={totalBookings}
                    setTotalBooking={setTotalBooking} />
            </Modal>}
        </div>
    );
};
