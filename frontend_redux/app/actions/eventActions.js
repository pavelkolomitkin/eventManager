import * as types from './types';

export function loadEvents(page = 1, date = null) {

}

export function eventsLoaded(events, total) {
    return {type: types.EVENTS_LOADED, events: events, total: total };
}

export function loadEvent(id) {

}

export function eventLoadedSuccess(event) {
    return {type: types.EVENT_LOADED_SUCCESS, event: event};
}

export function eventLoadedError(error) {
    return {type: types.EVENT_LOADED_ERROR, error: error};
}

export function createEvent(title, description, timeStart, timeEnd, priorityId) {

}

export function eventCreatedSuccess(event) {
    return {type: types.EVENT_CREATED_SUCCESS, event: event};
}

export function eventCreatedError(errors) {
    return {type: types.EVENT_CREATED_ERROR, errors: errors};
}

export function editEvent(id, title, description, timeStart, timeEnd, priorityId, statusId) {

}

export function eventEditedSuccess(event) {
    return {type: types.EVENT_EDITED_SUCCESS, event: event};
}

export function eventEditedError(errors) {
    return {type: types.EVENT_EDITED_ERROR, errors: errors};
}

export function eventDeletedSuccess() {
    return {type: types.EVENT_DELETED_SUCCESS}
}

export function eventDeletedError(error) {
    return {type: types.EVENT_DELETED_ERROR, error: error};
}