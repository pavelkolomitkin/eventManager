import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({userProfile, onLogoutClick}) => {
    return (
        <nav className="navbar navbar-fixed-top navbar-inverse">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand">Event Manager</Link>
                </div>

                {
                    userProfile &&
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul id="user-menu" className="nav navbar-nav navbar-right">
                            <li><Link to="/events">Events</Link></li>
                            <li>
                                <Link to="/event/create">
                                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Event
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span id="user-name">{userProfile.username}</span><span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/" onClick={onLogoutClick} id="user-logout">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                }

            </div>
        </nav>
    );
}

Header.propTypes = {
    userProfile: PropTypes.object,
    onLogoutClick: PropTypes.func.isRequired
};

export default Header;
