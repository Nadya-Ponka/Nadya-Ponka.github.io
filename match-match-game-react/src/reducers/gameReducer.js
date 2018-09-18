import { FLIP_CARD, MATCH_FOUND, SET_LAST_FLIPPED_CARD } from '../constants/index';

export function flipped(state = false, action) {
    if (action.type === FLIP_CARD) {
        return action.payload;
    }
    return state;
}

export function matches(state = 0, action) {
    if (action.type === MATCH_FOUND) {
        return action.payload;
    }
    return state;
}

export function lastCard(state = null, action) {
    if (action.type === SET_LAST_FLIPPED_CARD) {
        return action.payload;
    }
    return state;
}
