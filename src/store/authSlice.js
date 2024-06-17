import {createSlice} from '@reduxjs/toolkit'
import { useId } from 'react';
// const id=useId();
const initialState={
   
    // $id:'1',
status:false,
userData:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // state.$id=Date.now();
            state.status=true;
            state.userData=action.payload
        },
        logout:(state)=>{
state.status=false,
state.userData=null
        }
    }
})
export const {login,logout}= authSlice.actions
export default authSlice.reducer