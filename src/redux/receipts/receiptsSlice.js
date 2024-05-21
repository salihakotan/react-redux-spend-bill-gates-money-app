import { createSlice, nanoid } from "@reduxjs/toolkit";



export const receiptsSlice = createSlice({
    id:nanoid(),
    name:"receipts",
    initialState:{
        items:[],
    },
    reducers: {
        newReceipt(state,action){
            state.items.push(action.payload)
        },
        deleteReceipt(state,action){
           const _item = state.items.find((item)=> item.id ===action.payload.id)
            const index = state.items.findIndex((item)=> item.id ===action.payload.id)
            if(!index || !_item) return
           if(state.items[index].count <= 0) {
            state.items.splice(_item,1)
           } else {
            console.log("items: " ,state.items)
            state.items[index].count -= Number(action.payload.count)
           }
        },
        updateReceipt(state,action){
            console.log("payload",action.payload)
            const index = state.items.findIndex((item)=> item.id ===action.payload.id)
            state.items[index].count += Number(action.payload.count) 
            if(state.items[index].count <= 0) {
                state.items.splice(index,1)
            }
        }
    }
})

export const {newReceipt,deleteReceipt,updateReceipt} = receiptsSlice.actions

export const selectReceipts = (state) => state.receipts.items


export default receiptsSlice.reducer