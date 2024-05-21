import {configureStore} from "@reduxjs/toolkit"
import itemsSlice from "./items/itemsSlice"
import moneySlice from "./money/moneySlice"
import receiptsSlice from "./receipts/receiptsSlice"

export const store = configureStore({
    reducer: {
        items:itemsSlice,
        money:moneySlice,
        receipts:receiptsSlice
    }
})