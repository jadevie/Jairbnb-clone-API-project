import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { RequestToBookForm } from './RequestToBookForm';
import LoginForm from '../LoginFormModal/LoginForm.js';
import { useSelector } from 'react-redux';


function CreateBookingModal({ user, start,
    end,
    price,
    totalPrice,
    cleaningFee,
    serviceFee,
    totalDays }) {
    const [showModal, setShowModal] = useState(false);

    const owner = useSelector(state => state.spots.singleSpot);

    return (
        <>
            <button className={!user || (user && user.id !== owner.ownerId) ? 'btn' : 'disabledBtn'} disabled={user && user.id === owner.ownerId} onClick={
                () => setShowModal(true)
            }>{user ? 'Reserve' : 'Log in to book'}
            </button >
            {showModal && (
                user ?
                    <Modal onClose={() => setShowModal(false)}>
                        <RequestToBookForm
                            user={user}
                            hideModal={() => setShowModal(false)}
                            start={start}
                            end={end}
                            price={price}
                            totalPrice={totalPrice}
                            cleaningFee={cleaningFee}
                            serviceFee={serviceFee}
                            totalDays={totalDays} />
                    </Modal> :
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
            )
            }
        </>
    );
};

export default CreateBookingModal;
