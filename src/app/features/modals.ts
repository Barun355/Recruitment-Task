import { createSlice } from "@reduxjs/toolkit";

interface ModalType {
    widgetSidebar: boolean;
    searchModal: boolean;
}

const initialState: ModalType = {
    widgetSidebar: false,
    searchModal: false
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleWidgetSidebar: (state) => {
            state.widgetSidebar = state.widgetSidebar ? false: true
        },
        toggleSearchModal: (state) => {
            state.searchModal = state.searchModal ? false: true
        }
        
    }

});

export const { toggleWidgetSidebar, toggleSearchModal } = modalSlice.actions;
export default modalSlice.reducer;