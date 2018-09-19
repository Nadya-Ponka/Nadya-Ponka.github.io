import * as actions from '../../src/actions/actionTypes';
import * as types from '../../src/constants/index';

describe('actions', () => {
    it('should create an action to choose backCard', () => {
        const expectedAction = {
            type: types.CHOOSE_BACK_CARD,
            payload: 'back-3.png',
        };
        expect(actions.chooseBackCard('back-3.png')).toEqual(expectedAction);
    });
});
