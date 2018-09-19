import React from 'react';
import { shallow } from 'enzyme';

import Something from '../../src/components/Something';

describe('Something', () => {
    test('match snapshot', () => {
        const wrapper = shallow(<Something />);
        expect(wrapper).toMatchSnapshot();
    });
});
