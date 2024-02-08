import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import {asyncActionsMiddleware} from "./middleware";

const store = createStore(reducer, applyMiddleware(asyncActionsMiddleware));

export type RootState = ReturnType<typeof store.getState>;

export default store;
