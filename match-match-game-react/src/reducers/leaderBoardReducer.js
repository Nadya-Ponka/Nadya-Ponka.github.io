import { SHOW_LEADERBOARD } from '../constants/index';

const initialState = [];

export default function leaderBoard(state = initialState, action) {
    if (action.type === SHOW_LEADERBOARD) {
        return action.payload;
    }
    return state;
}
