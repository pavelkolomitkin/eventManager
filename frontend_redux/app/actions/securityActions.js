import * as types from './types';
import ApiClient from '../services/ApiClient';
import * as serverActions from './serverActions';
import SessionManager from '../services/SessionManager';

export function loginUser(username, password, successCallback) {

    return (dispatch) => {

        dispatch(serverActions.serverRequest());

        ApiClient.getInstance().login(
            username,
            password,
            (response) => {
                // TODO сделать установку данных значений в store.subscribe(() => {здесь})
                ApiClient.getInstance().setAuthToken(response.data.token);
                SessionManager.getInstance().keepAuthToken(response.data.token);

                dispatch(userLoginSuccess(response));
                dispatch(serverActions.serverResponse());
                successCallback(response.data);
            },
            (error) => {
                dispatch(userLoginError());
                dispatch(serverActions.serverResponse());
            }
        );
    };
}

export function registerUser(username, email, password, passwordRepeat, successCallback) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        //debugger;
        ApiClient.getInstance().register(
            username,
            email,
            password,
            passwordRepeat,
            (response) => {
                // TODO сделать установку данных значений в store.subscribe(() => {здесь})
                ApiClient.getInstance().setAuthToken(response.data.token);
                SessionManager.getInstance().keepAuthToken(response.data.token);

                dispatch(userRegisterSuccess(response.data));
                dispatch(serverActions.serverResponse());
                successCallback(response.data);
            },
            (error) => {

                //debugger;
                let errors = {};

                let responseErrors = error.response.data.children;
                if (responseErrors.email &&
                    responseErrors.email.errors &&
                    responseErrors.email.errors.length > 0)
                {
                    errors.email = responseErrors.email.errors[0];
                }

                if (responseErrors.plainPassword &&
                    responseErrors.plainPassword.children.first.errors &&
                    responseErrors.plainPassword.children.first.errors.length > 0)
                {
                    errors.password = responseErrors.plainPassword.children.first.errors[0];
                }

                if (responseErrors.plainPassword &&
                    responseErrors.plainPassword.children.second.errors &&
                    responseErrors.plainPassword.children.second.errors.length > 0)
                {
                    errors.passwordRepeat = responseErrors.plainPassword.children.second.errors[0];
                }

                if (responseErrors.username &&
                    responseErrors.username.errors &&
                    responseErrors.username.errors.length > 0)
                {
                    errors.username = responseErrors.username.errors[0];
                }

                dispatch(userRegisterError(errors));
                dispatch(serverActions.serverResponse());
            }
        );
    };
}

export function userLoginSuccess(userData) {
    return {type: types.USER_LOGIN_SUCCESS, loginUserData: userData};
}

export function userLoginError() {
    return {type: types.USER_LOGIN_ERROR };
}

export function userLogout() {
    return {type: types.USER_LOGOUT};
}

export function userRegisterSuccess(userData) {
    return {type: types.USER_REGISTER_SUCCESS, data: userData};
}

export function userRegisterError(errors) {
    return {type: types.USER_REGISTER_ERROR, errors: errors};
}