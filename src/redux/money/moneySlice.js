import { createSlice } from "@reduxjs/toolkit";


export const moneySlice = createSlice({
    name:"money",
    initialState: {
        moneyAmount:100000000000
    },
    reducers: {
        decreaseMoney(state,action){
            state.moneyAmount -= Number(action.payload)
        },
        increaseMoney(state,action){
            state.moneyAmount += Number(action.payload)
        }
    },
})


export const selectMoney = (state) => state.money.moneyAmount


export const {decreaseMoney,increaseMoney} = moneySlice.actions


export default moneySlice.reducer