import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/UserSlice"
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";



const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['auth'],
};

const reducer = combineReducers({
    auth:authReducer
});

const persistedReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer: persistedReducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;