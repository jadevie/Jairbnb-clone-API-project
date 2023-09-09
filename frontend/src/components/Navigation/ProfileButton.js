import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';


const ProfileButton = ({ user, setLogin, setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        history.push("/");
    };

    return (
        <>
            <div className="profile-container">
                <button onClick={openMenu} id="profile-button">
                    <i className="fa-solid fa-bars" style={{ padding: '0px 5px', fontSize: '20px' }}></i>
                    <i class="fa-solid fa-circle-user" style={{ padding: '5px', fontSize: '22px', color: '#777777' }}></i>
                </button>
                {showMenu && (
                    user ?
                        <ul className="profile-dropdown">
                            <div className="name">{user.firstName}</div>
                            <div className="username">{user.username}</div>
                            <Link to="/trips" className='link'>Trips</Link>
                            <Link to="/hosting" className='link'>Host an experience</Link>
                            <button onClick={logout} className='logout-btn'>Log Out</button>
                        </ul> :
                        <ul className="dropdown-menu">
                            <div ><button className="login-button" onClick={() => {
                                setLogin(true);
                                setShowModal(true);
                            }}>Log in</button></div>
                            <div><button className="signup-button"
                                onClick={() => {
                                    setLogin(false);
                                    setShowModal(true);
                                }}>Sign up</button></div>
                        </ul>
                )}
            </div>
        </>
    );
};

export default ProfileButton;
