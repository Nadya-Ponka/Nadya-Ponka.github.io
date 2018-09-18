import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from '../../../src/components/landing-page/landing-page';

describe('LandingPage', () => {
    test('match snapshot', () => {
        const wrapper = shallow(<LandingPage />);
        expect(wrapper).toMatchSnapshot();
    });
});
