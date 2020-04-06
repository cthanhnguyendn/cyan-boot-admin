import thunk from 'redux-thunk'
import client from "../client";
import {makeRootReducer} from "./reducer";
import {applyMiddleware, compose, createStore as createReduxStore} from "redux";
export const extra = {
    client
}
export const createStore = (initialState) => {
    const middleware = [thunk.withExtraArgument(extra)]

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    let composeEnhancers = compose
    if (process.env.NODE_ENV === 'development') {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        }
    }
    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createReduxStore(
        makeRootReducer(),
        initialState,
        composeEnhancers(applyMiddleware(...middleware), ...enhancers)
    )

    store.asyncReducers = {}
    return store
}