import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import PlayingField from './playingField';

// Pages
import LeaderBoard from './../leaderBoard/LeaderBoard';
import Something from './../Something';

export default (
    <Router history={browserHistory}>
        <Route component={PlayingField}>

            <Route path="recordsTable">
                <IndexRoute component={LeaderBoard} />
            </Route>

            <Route path="smt-else">
                <IndexRoute component={Something} />
            </Route>

        </Route>
    </Router>
);
