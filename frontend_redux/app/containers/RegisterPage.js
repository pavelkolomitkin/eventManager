import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterPageView from '../components/RegisterPage';
import * as securityActions from '../actions/securityActions';
import FormPage from './FormPage';

class RegisterPage extends FormPage {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userName: '',
            email: '',
            password: '',
            passwordRepeat: ''
        };
    }

    submitHandler(event)
    {
        this.props.actions.registerUser(
            this.state.userName,
            this.state.email,
            this.state.password,
            this.state.passwordRepeat,
            () => {
                this.props.history.push('/profile');
            }
        );
    }

    render() {

        return (
            <RegisterPageView
                errors={this.props.errors}
                userName={this.state.userName}
                email={this.state.email}
                password={this.state.password}
                passwordRepeat={this.state.passwordRepeat}
                onSubmit={this.onSubmit}
                onFieldChange={this.onFieldChange}
            />
        );
    }
}

RegisterPage.propTypes = {
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

    return {
        errors: state.security.errors ? state.security.errors : {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);