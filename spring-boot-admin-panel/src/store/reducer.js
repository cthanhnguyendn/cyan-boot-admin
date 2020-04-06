import {combineReducers} from "redux"
import metaReducer from './meta'

export const makeRootReducer = () => (combineReducers({
    meta: metaReducer
}))