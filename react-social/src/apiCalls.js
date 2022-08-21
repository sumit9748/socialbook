import { axiosInstance } from "./config";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import React from "react";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });

    const res = await axiosInstance.post("auth/login", userCredential).then((res) => {
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                {`${res}`}
            </Alert>
        </Snackbar>
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }).catch((err) => {
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                {`${err}`}
            </Alert>
        </Snackbar>
        dispatch({ type: "LOGIN_FAILURE", payload: err });

    })
};

