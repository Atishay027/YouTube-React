import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name: ' chat',
    initialState: {
        message:[],            //{name:"Atishay Jain", message:"input"},{}
    },
    reducers:{
        setMessage: (state,action)=>{
            state.message.splice(40,1);
            state.message.push(action.payload);
        }
    }
})

export const {setMessage} = chatSlice.actions;
export default  chatSlice.reducer;