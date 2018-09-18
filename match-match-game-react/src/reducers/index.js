import { combineReducers } from 'redux';

import leaderBoard from './leaderBoardReducer';
import { cards, backCard, level } from './prepareDataReducer';
import { startedAt, stoppedAt } from './timerReducer';
import { flipped, matches, lastCard } from './gameReducer';

export default combineReducers({
    backCard,
    level,
    startedAt,
    stoppedAt,
    flipped,
    matches,
    lastCard,
    leaderBoard,
    cards,
});
