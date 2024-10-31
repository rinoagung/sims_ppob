// src/redux/slices/index.js
import { combineReducers } from 'redux';
import reducer from './slice';

const rootReducer = combineReducers({
    slice: reducer,
});

export default rootReducer;
