import { AlertColor } from '@mui/material'
import { createSlice } from '@reduxjs/toolkit'

const toaster = createSlice({
    name: 'toaster',
    initialState: {
        isOpen: false,
        message: '',
        severity: 'success' as AlertColor,
        autoHideDuration: 5000,
    },
    reducers: {
        open: (state, action) => {
            state.isOpen = true
            state.message = action.payload.message
            state.severity = action.payload.severity || 'success'
            state.autoHideDuration = action.payload.autoHideDuration || 5000
        },
        close: (state) => {
            state.isOpen = false
        },
    },
})
export default toaster;