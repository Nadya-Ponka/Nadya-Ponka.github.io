import { MAKE_CARD_ARRAY, CHOOSE_BACK_CARD, CHOOSE_DIFFICULTY } from '../constants/index';

export function cards(state = [], action) {
    if (action.type === MAKE_CARD_ARRAY) {
        return action.payload;
    }
    return state;
}

export function backCard(state = 'back-1.png', action) {
    if (action.type === CHOOSE_BACK_CARD) {
        return action.payload;
    }
    return state;
}

export function level(state = '5', action) {
    if (action.type === CHOOSE_DIFFICULTY) {
        return action.payload;
    }
    return state;
}
