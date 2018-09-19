import React from 'react';
import { shallow } from 'enzyme';

import ConnectedPlayingField, { PlayingField } from '../../../src/components/playingField/playingField';
import { leaderBoard } from '../../../src/utils';

describe('PlayingField', () => {
    const state = {
        cards: [],
        level: '5',
        leaderBoard: [],
        subscribe: () => {},
        dispatch: () => {},
        getState: () => {},
    };

    test('match snapshot', () => {
        const wrapper = shallow(<PlayingField store={state} />);
        expect(wrapper).toMatchSnapshot();
    });
});
