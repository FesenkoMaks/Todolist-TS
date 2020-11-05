import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setInitializedAC } from '../../app/app-reducer'
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {LoginParamsType} from "../TodolistsList/TodolistsList";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean }>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
        dispatch(setInitializedAC({isInitialized: true}))
    })
}


// types
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
type InitialStateType = {
    isLoggedIn: boolean
}
