import * as React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/globalStore";
import toasterSlice from "../store/toaster";

const Toaster = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(toasterSlice.actions.close())
    };
    const { message, isOpen, severity, autoHideDuration } = useSelector((state: RootState) => state.toaster);

    return (<Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
    >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>)
}
export default Toaster;