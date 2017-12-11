import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderView from '../components/Header';
import * as securityActions from '../actions/securityActions';
import SessionManager from '../services/SessionManager';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick()
    {
        SessionManager.getInstance().logout();
        this.props.actions.userLogout();

        this.props.history.push('/login');
    }

    render() {

        return (
            <HeaderView userProfile={this.props.userProfile} onLogoutClick={this.onLogoutClick} />
        );
    }
}

Header.propTypes = {
    userProfile: PropTypes.object
};

function mapStateToProps(state, ownProps) {

    const userData = SessionManager.getInstance().getSessionData();
    return {
        userProfile: userData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);