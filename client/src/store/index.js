import { createStore, applyMiddleware } from "redux";
import {composeWithDevtools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

const store = createStore(rootReducer, composeWithDevtools(applyMiddleware(thunk)))

export default store;