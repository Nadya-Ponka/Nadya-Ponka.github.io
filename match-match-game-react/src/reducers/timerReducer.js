import { START_TIMER, STOP_TIMER } from '../constants/index';

export function startedAt(state = null, action) {
    if (action.type === START_TIMER) {
        return action.now;
    }
    return state;
}

export function stoppedAt(state = null, action) {
    if (action.type === STOP_TIMER) {
        return action.now;
    }
    return state;
}
