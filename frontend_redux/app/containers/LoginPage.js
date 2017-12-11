import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginPageView from '../components/LoginPage';
import * as securityActions from '../actions/securityActions';
import FormPage from './FormPage';

class LoginPage extends FormPage {
    constructor(props, context) {
        super(props, context);

        this.state = {
            userName: '',
            password: ''
        };
    }

    submitHandler(event)
    {
        this.props.actions.loginUser(
            this.state.userName,
            this.state.password,
            () => {
                this.props.history.push('/events');
            });
    }

    render() {
        return (
            <LoginPageView
                error={this.props.error}
                onSubmit={this.onSubmit}
                userName={this.state.userName}
                password={this.state.password}
                onChange={this.onFieldChange}
            />
        );
    }
}

LoginPage.propTypes = {};

function mapStateToProps(state, ownProps) {
    return {
        error: state.security.loginError ? state.security.loginError : false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(securityActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);