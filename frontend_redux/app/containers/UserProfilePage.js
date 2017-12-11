import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserProfilePageView from '../components/UserProfilePage';
import * as profileActions from '../actions/profileActions';


class UserProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.props.actions.loadUserProfile();
    }

    render() {
        return (
            <UserProfilePageView userProfile={this.props.userProfile} />
        );
    }
}

UserProfilePage.propTypes = {
    userProfile: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        userProfile: state.profile.userProfile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);