import { combineReducers } from 'redux';
import cleanerReducer from './cleanerReducer';
import roomReducer from './roomReducer';

export default combineReducers({
    cleanerReducer,
    roomReducer,
});