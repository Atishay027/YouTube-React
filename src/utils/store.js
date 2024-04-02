import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./AppSlice";
import ChatReducer from "./ChatSlice";

const store = configureStore({
    reducer:{
          app: appReducer,
          chat: ChatReducer
    }
})

export default store;



