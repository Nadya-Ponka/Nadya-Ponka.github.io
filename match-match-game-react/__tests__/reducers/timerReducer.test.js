import * as actions from '../../src/actions/actionTypes';
import * as types from '../../src/constants/index';

describe('actions', () => {
    it('should create an action to start timer', () => {
        const now = new Date().getTime();
        const expectedAction = {
            type: types.START_TIMER,
            now,
        };
        expect(actions.startTimer()).toEqual(expectedAction);
    });
});
