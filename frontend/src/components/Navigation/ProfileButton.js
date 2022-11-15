import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import CreateSpotForm from "../CreateSpotForm";

const ProfileButton = ({ user, setLogin, setShowModal }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logoutUserThunk());
    };

    return (
        <>
            <button onClick={openMenu} id="profile-button">
                <i className="fa-solid fa-bars" style={{ padding: '0px 5px' }}></i>
                <i className="fa-regular fa-user" style={{ padding: '5px' }}></i>
            </button>
            {showMenu && (
                user ? <ul className="profile-dropdown">
                    <a href="/hosting">Host an experience</a>
                    <div>
                        <button onClick={logout}>Log Out</button>
                    </div>
                </ul> :
                    <ul className="profile-dropdown">
                        <li><button onClick={() => {
                            setLogin(true);
                            setShowModal(true);
                        }}>Log in</button></li>
                        <li><button
                            onClick={() => {
                                setLogin(false);
                                setShowModal(true);
                            }}>Sign up</button></li>
                    </ul>
            )}
        </>
    );
};

export default ProfileButton;
