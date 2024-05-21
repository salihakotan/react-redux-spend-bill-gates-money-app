import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


export const itemsSlice = createSlice({
    name:"items",
    initialState: {
        items:[],
        status:"idle",
        error:null,
        hasNextPage:true,
        page:1,
        allPages:0,
        allItems:0
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(getItemsAsync.pending, (state,action) => {
            state.status = "loading"
        })
        .addCase(getItemsAsync.fulfilled, (state,action) => {
            state.status = "succeeded"

            if(action.payload.next) {
                state.page = action.payload.next-1
            }
           

           if(state.page === 1) {
            state.items = action.payload.data
           } else {

            state.items = [...state.items,...action.payload.data]
           }
        
            
            state.allPages = action.payload.pages
            state.allItems = action.payload.items

            if(action.payload.next === null) {
                state.hasNextPage = false
            }
        })
        .addCase(getItemsAsync.rejected, (state,action) => {
            state.status = "failed"

        })

    }
})


export const getItemsAsync = createAsyncThunk("items/getItemsAsync", async(page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/items/?_page=${page}/`)
    return await res.data
})


export const selectItems = (state) => state.items.items
export const selectStatus = (state) => state.items.status
export const selectError = (state) => state.items.error
export const selectNextPage = (state) => state.items.page
export const selectHasNextPage = (state) => state.items.hasNextPage
export const selectAllPagesLength = (state) => state.items.allPages
export const selectAllItemsLength = (state) => state.items.allItems



export default itemsSlice.reducer