import * as types from './types';
import * as serverActions from './serverActions';
import ApiClient from '../services/ApiClient';

export function loadEvents(page = 1, date = null)
{
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadEvents(
            page,
            date,
            (result) => {

                dispatch(eventsLoaded(result.data.events, result.data.total));
                dispatch(serverActions.serverResponse());
            },
            () => {
                dispatch(serverActions.serverResponse());
            }
        );
    };
}

export function eventsLoaded(events, total) {
    return {type: types.EVENTS_LOADED, events: events, total: total };
}

export function loadEvent(id, successCallback, errorCallback) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().loadEvent(
            id,
            (result) => {

                dispatch(eventLoadedSuccess(result.data));
                dispatch(serverActions.serverResponse());
                successCallback(result.data);
            },
            (error) => {

                dispatch(eventLoadedError(error));
                dispatch(serverActions.serverResponse());
                errorCallback(error);
            }
        )
    };
}

export function eventLoadedSuccess(event) {
    return {type: types.EVENT_LOADED_SUCCESS, event: event};
}

export function eventLoadedError(error) {
    return {type: types.EVENT_LOADED_ERROR, error: error};
}

export function createEvent(title, description, timeStart, timeEnd, priorityId, successCallback) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().createEvent(
            title,
            description,
            timeStart,
            timeEnd,
            priorityId,
            (result) => {
                debugger;
                dispatch(eventCreatedSuccess(result.data.event));
                dispatch(serverActions.serverResponse());
                successCallback(result.data.event);
            },
            (error) => {
                debugger;
                let errors = {};

                const responseErrors = error.response.data.children;
                const processingFields = ['title', 'description', 'priority', 'timeStart', 'timeEnd'];

                processingFields.map((field, index) => {
                    if (responseErrors[field] &&
                        responseErrors[field].errors &&
                        responseErrors[field].errors.length > 0)
                    {
                        errors[field] = responseErrors[field].errors[0];
                    }
                });

                dispatch(eventCreatedError(errors));
                dispatch(serverActions.serverResponse());
            }
        )
    };
}

export function eventCreatedSuccess(event) {
    return {type: types.EVENT_CREATED_SUCCESS, event: event};
}

export function eventCreatedError(errors) {
    return {type: types.EVENT_CREATED_ERROR, errors: errors};
}

export function editEvent(id, title, description, timeStart, timeEnd, priorityId, statusId)
{
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().updateEvent(
            id,
            title,
            description,
            timeStart,
            timeEnd,
            priorityId,
            statusId,
            (result) => {

                dispatch(eventEditedSuccess(result.data.event));
                dispatch(serverActions.serverResponse());
            },
            (error) => {

                dispatch(eventEditedError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    };
}

export function eventEditedSuccess(event) {
    return {type: types.EVENT_EDITED_SUCCESS, event: event};
}

export function eventEditedError(errors) {
    return {type: types.EVENT_EDITED_ERROR, errors: errors};
}

export function deleteEvent(id) {
    return (dispatch) => {
        dispatch(serverActions.serverRequest());
        ApiClient.getInstance().deleteEvent(
            id,
            (result) => {

                dispatch(eventDeletedSuccess());
                dispatch(serverActions.serverResponse());
            },
            (error) => {

                dispatch(eventDeletedError(error));
                dispatch(serverActions.serverResponse());
            }
        );
    };
}

export function eventDeletedSuccess() {
    return {type: types.EVENT_DELETED_SUCCESS}
}

export function eventDeletedError(error) {
    return {type: types.EVENT_DELETED_ERROR, error: error};
}