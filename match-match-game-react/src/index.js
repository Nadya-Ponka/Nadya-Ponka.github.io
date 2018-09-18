import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import GameDOM from './Game';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={browserHistory}>
            <GameDOM />
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root'),
);
