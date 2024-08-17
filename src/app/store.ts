import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./features/widgets";
import modals from "./features/modals";


export const store = configureStore({
    reducer: {
        widget_data: widgetReducer,
        modal: modals
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;