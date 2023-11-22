import { createSlice } from '@reduxjs/toolkit'

const toaster = createSlice({
    name: 'toaster',
    initialState: {
        isOpen: false,
        message: '',
        type: '',
    },
    reducers: {
        open: (state, action) => {
            state.isOpen = true
            state.message = action.payload.message
            state.type = action.payload.type
        },
        close: (state) => {
            state.isOpen = false
            state.message = ''
            state.type = ''
        },
    },
})
export default toaster;