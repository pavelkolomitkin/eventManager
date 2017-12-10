import * as types from './types';

export function loadPriorities() {

}

export function prioritiesLoaded(priorities) {
    return {type: types.EVENT_PRIORITIES_LOADED, priorities: priorities};
}