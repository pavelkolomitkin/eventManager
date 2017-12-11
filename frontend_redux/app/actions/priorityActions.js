import * as types from './types';
import * as serverActions from './serverActions';
import ApiClient from '../services/ApiClient';

export function loadPriorities() {

    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadEventPriorities(
            (result) => {
                dispatch(prioritiesLoaded(result.data));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                // TODO Обработать позже
            }
        );
    };

}

export function prioritiesLoaded(priorities) {
    return {type: types.EVENT_PRIORITIES_LOADED, priorities: priorities};
}