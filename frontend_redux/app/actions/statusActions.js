import * as types from './types';

export function loadStatuses() {

}

export function statusesLoaded(statuses) {
    return {type: types.EVENT_STATUSES_LOADED, statuses: statuses};
}
