import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import allReducer from "../reducers";

export default function initializeStore(state) {
  // console.log(state);
  const store = createStore(allReducer, state, applyMiddleware(thunk));
  // console.log(store.getState());
  return store;
}
