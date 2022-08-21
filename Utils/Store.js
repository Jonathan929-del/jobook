// Imports
import Cookies from 'js-cookie'
import {createContext, useReducer} from 'react'


// Configuring Store
export const Store = createContext();


// Initial State
const initialState = {
    darkMode:Cookies.get('darkMode') ? JSON.parse(Cookies.get('darkMode')) : false,
    userInfo:Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
    loading:false,
    error:Boolean,
    posts:[]
};


// Reducer
const reducer = (state, action) => {
    switch (action.type) {

        // Dark Mode
        case 'DARK_MODE_ON':{
            return {...state, darkMode:true};
        }
        case 'DARK_MODE_OFF':{
            return {...state, darkMode:false};
        }

        // User Login
        case 'USER_LOGIN_START':{
            return {...state, loading:true, error:false};
        }
        case 'USER_LOGIN_SUCCESS':{
            return {...state, userInfo:action.payload, loading:false, error:false};
        }
        case 'USER_LOGIN_FAIL':{
            return {...state, loading:false, error:true};
        }

        // User Logout
        case 'USER_LOGOUT':{
            return {...state, userInfo:null};
        }


        // Sharing Post
        case 'POST_START':{
            return {...state, error:false, loading:true};
        }
        case 'POST_SUCCESS':{
            return {...state, error:false, loading:false};
        }
        case 'POST_FAIL':{
            return {...state, error:true, loading:false};
        }


        // Default
        default:
            state;
    }
}


// Store Provider
export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
};