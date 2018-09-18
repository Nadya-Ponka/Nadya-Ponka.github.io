import {
    FLIP_CARD,
    CHOOSE_BACK_CARD,
    CHOOSE_DIFFICULTY,
    MAKE_CARD_ARRAY,
    START_TIMER,
    STOP_TIMER,
    MATCH_FOUND,
    SET_LAST_FLIPPED_CARD,
    SHOW_LEADERBOARD,
} from '../constants/index';
import { takeDataFromAPI } from '../middleWare/takeDataFromAPI';

export const chooseBackCard = id => ({
    type: CHOOSE_BACK_CARD,
    payload: id,
});

export const chooseGameDifficulty = value => ({
    type: CHOOSE_DIFFICULTY,
    payload: value,
});

export const makeCardArray = arr => ({
    type: MAKE_CARD_ARRAY,
    payload: arr,
});

export const startTimer = () => ({
    type: START_TIMER,
    now: new Date().getTime(),
});

export const stopTimer = () => ({
    type: STOP_TIMER,
    now: new Date().getTime(),
});

export const flipCard = booleanValue => ({
    type: FLIP_CARD,
    payload: booleanValue,
});

export const matchFound = value => ({
    type: MATCH_FOUND,
    payload: value,
});

export const setLastFlippedCard = value => ({
    type: SET_LAST_FLIPPED_CARD,
    payload: value,
});

export const showLeaderBoard = dispatch => dispatch(takeDataFromAPI());

/*export const showLeaderBoard = arr => ({
    type: SHOW_LEADERBOARD,
    payload: arr,
});*/
