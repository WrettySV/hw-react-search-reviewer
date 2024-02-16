import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import {asyncActionsMiddleware} from "./middleware";
import { useDispatch } from 'react-redux';


const store = createStore(rootReducer,{},applyMiddleware(asyncActionsMiddleware));

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
