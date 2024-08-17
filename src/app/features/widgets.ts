import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Type Defination
export interface Widgets {
    label: string,
    data: string,
    isActive: boolean
}

export interface WidgetState {
    [key: string]: {
        "label": string,
        "widgets":  Widgets[]
    }
}

// Initial State
const initialState: WidgetState = {
    "CSPM": {
        label: "CSPM Executive Dashboard",
        widgets: [
            {
                label: "Cloud Accounts",
                data: "Cloud Accounts",
                isActive: true
            },
            {
                label: "Cloud Accounts Risk Assesment",
                data: "Cloud Accounts Risk Assesment",
                isActive: true
            }
        ]
    },
    "CWPP": {
        label: "CWPP Dashboard",
        widgets: [
            {
                label: "Top 5 Namespace Specific Alerts",
                data: "Dummy",
                isActive: true
            },
            {
                label: "Workload Alerts",
                data: "Dummy",
                isActive: true
            }
        ]
    },
    "Registry Scan": {
        label: "Registry Scan",
        widgets: [
            {
                label: "Image Risk Assesment",
                data: "Dummy",
                isActive: true
            },
            {
                label: "Image Security Issues",
                data: "Dummy",
                isActive: true
            }
        ]
    }
}

// Slice
const widgetSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {

        // Add Widgets to category
        addWidget: (state, action: PayloadAction<{label: string, category: string, data: string, isActive: boolean }>) => {
            console.log(action.payload)
            state[action.payload.category].widgets.push({
                label: action.payload.label,
                data: action.payload.data,
                isActive: action.payload.isActive
            })
        },

        // Update Widget Active state of a category
        updateWidgetIsActive: (state, action: PayloadAction<{ category: string, label: string, isActive: boolean}>) => {
            console.log("[Widget State]: ", action.payload)
            
            const widgets = state[action.payload.category].widgets

            const newWidgets = widgets.map(storeWidget => storeWidget.label === action.payload.label ? {
                ...storeWidget,
                isActive: action.payload.isActive
            } : {
                ...storeWidget
            })
            state[action.payload.category].widgets = newWidgets
            
        }
    }

});

export const { addWidget, updateWidgetIsActive } = widgetSlice.actions;
export default widgetSlice.reducer;