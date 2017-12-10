import * as types from './types';
import ApiClient from '../services/ApiClient';
import * as serverActions from './serverActions';

export function loadUserProfile(successCallback, errorCallback)
{
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadUserProfile(
            (result) => {
                dispatch(userProfileLoaded(result.data));
                dispatch(serverActions.serverResponse());
                successCallback(result.data);
            },
            () => {
                dispatch(userProfileLoadError());
                dispatch(serverActions.serverResponse());
                errorCallback();
            }
        );

    };
}

export function userProfileLoaded(profileData)
{
    return {type: types.USER_PROFILE_LOADED, profile: profileData};
}
export function userProfileLoadError() {
    return {type: types.USER_PROFILE_LOAD_ERROR};
}