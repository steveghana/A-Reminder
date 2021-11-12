import {combineReducers} from 'redux'
import {post} from './reducers'
import { userReducer } from './user'
export default combineReducers({
post,
User : userReducer
})