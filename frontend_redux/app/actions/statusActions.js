import * as types from './types';
import * as serverActions from './serverActions';
import ApiClient from '../services/ApiClient';

export function loadStatuses() {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadStatuses(
            (result) => {
                dispatch(statusesLoaded(result.data.statuses));
                dispatch(serverActions.serverResponse());
            },
            (error) => {
                // TODO Обработать позже
            }
        );
    };
}

export function statusesLoaded(statuses) {
    return {type: types.EVENT_STATUSES_LOADED, statuses: statuses};
}
