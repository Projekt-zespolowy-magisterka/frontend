import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import LogoSection from './LogoSection';

const TopMenu = ({ username, onLogout, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        } else {
            const newProfileImage = `https://robohash.org/${username}.png?size=50x50`;
            localStorage.setItem('profileImage', newProfileImage);
            setProfileImage(newProfileImage);
        }
    }, [username]);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const handleNavigateToProfile = () => {
        navigate('/profile');
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                {/* Logo Section */}
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <LogoSection showText={true} />
                </NavLink>

                {/* Search Bar */}
                <form
                    className="d-flex justify-content-center w-100"
                    onSubmit={handleSearchSubmit}
                >
                    <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for stocks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>

                {/* Right Section */}
                <div className="d-flex align-items-center ms-5">
                    {/* Explore Section */}
                    <NavLink
                        to="/stock-overview"
                        className={({ isActive }) =>
                            isActive
                                ? 'nav-link text-primary font-weight-bold d-flex align-items-center'
                                : 'nav-link text-muted d-flex align-items-center'
                        }
                        style={{ marginRight: '15px' }}
                    >
                        <i className="fa fa-compass me-2" style={{ fontSize: '1.5rem' }}></i>
                        <span>Explore</span>
                    </NavLink>


                    {/* User Profile */}
                    <div className="dropdown">
                        <button
                            className="btn btn-light dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="userDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={profileImage}
                                alt={username}
                                className="rounded-circle me-2"
                                style={{ width: '30px', height: '30px' }}
                            />
                            {username}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={handleNavigateToProfile}
                                >
                                    Profile
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopMenu;
