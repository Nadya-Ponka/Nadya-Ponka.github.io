import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import ping from './middleWare/ping';

const store = createStore(reducer, applyMiddleware(thunk, ping));

export default store;
