import React, { Fragment } from 'react';
import { Route } from 'react-router';

import '../Styles/style.css';

import LandingPage from './components/landing-page/landing-page';
import Introduction from './components/introdaction/Introdaction';
import PlayingField from './components/playingField/playingField';

require('babel-core/register');
require('babel-polyfill');

class GameDOM extends React.Component {
    render() {
        return (
            <Fragment>
                <section className="greeting">
                    <LandingPage />
                    <Introduction/>
                </section>
                <main>
                    <Route path='/' component={PlayingField} />
                </main>
            </Fragment>
        );
    }
}

export default GameDOM;
