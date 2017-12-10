import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserProfilePageView from '../components/UserProfilePage';


class UserProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <UserProfilePageView/>
        );
    }
}

UserProfilePage.propTypes = {};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }

export default connect(mapStateToProps, null)(UserProfilePage);