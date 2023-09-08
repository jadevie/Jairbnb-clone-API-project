import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { RequestToBookForm } from './RequestToBookForm';
import LoginForm from '../LoginFormModal/LoginForm.js';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SpotDetails from '../SpotDetails/SpotDetails.js';
import { MustPickDayForm } from './MustPickDayForm';

function CreateBookingModal({ user, start,
    end,
    price,
    totalPrice,
    cleaningFee,
    serviceFee,
    totalDays,
    id }) {
    const [showModal, setShowModal] = useState(false);
    const dayIsNotSelectedYet = (isNaN(Number(start[0]))) || (isNaN(Number(end[0])));

    console.log(dayIsNotSelectedYet);

    const owner = useSelector(state => state.spots.singleSpot);

    return (
        <>
            <button
                className={!user || (user && user.id !== owner.ownerId) ? 'btn' : 'disabledBtn'}
                disabled={(user && (user.id === owner.ownerId))}
                onClick={() => setShowModal(true)}
            >
                {user ? 'Reserve' : 'Log in to book'}
            </button >
            {showModal && (
                user ?
                    <Modal onClose={() => setShowModal(false)}>
                        {dayIsNotSelectedYet ?
                            <MustPickDayForm /> :
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
                        }
                    </Modal> :
                    // <Modal onClose={() => setShowModal(false)}>
                    //     {!isDaySelectYet ?
                    //         <RequestToBookForm
                    //             user={user}
                    //             hideModal={() => setShowModal(false)}
                    //             start={start}
                    //             end={end}
                    //             price={price}
                    //             totalPrice={totalPrice}
                    //             cleaningFee={cleaningFee}
                    //             serviceFee={serviceFee}
                    //             totalDays={totalDays} /> :
                    //         <MustPickDayForm
                    //             id={id}
                    //             hideModal={() => setShowModal(false)} />
                    //     }
                    // </Modal> :
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm setShowModal={setShowModal} />
                    </Modal>
            )
            }
        </>
    );
};

export default CreateBookingModal;
