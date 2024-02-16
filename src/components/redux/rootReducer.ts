import { combineReducers } from 'redux';
import reducerReviewer from './reviewer/reducerReviewer';
import reducerSettings from "./settings/reducerSettings";

const rootReducer = combineReducers({
    reviewer: reducerReviewer,
    settings: reducerSettings
});

export default rootReducer;
