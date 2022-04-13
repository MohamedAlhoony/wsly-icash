import { combineReducers } from 'redux'
import home_page_reducer from './home_page_reducer'
import userForm_page_reducer from './user-form-page-reducer'
import layout_reducer from './layout_reducer'
const appReducer = combineReducers({
    home_page_reducer,
    userForm_page_reducer,
    layout_reducer,
})
const appReducer_middleware = (state, action) => {
    switch (action.type) {
        case 'reset-app':
            state = undefined
            break
        case 'reset-home_page_reducer':
            state.home_page_reducer = undefined
            break
        case 'reset-userForm_page_reducer':
            state.userForm_page_reducer = undefined
            break
        case 'reset-layout_reducer':
            state.layout_reducer = undefined
            break
        default:
    }
    return appReducer(state, action)
}
export default appReducer_middleware
