import { axiosInstance } from "./config";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import React from "react";
import Stack from '@mui/material/Stack';

export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });

    await axiosInstance.post("auth/login", userCredential).then((res) => {
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {`${res}`}
                </Alert>
            </Snackbar>
        </Stack>
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }).catch((err) => {
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {`${err}`}
                </Alert>
            </Snackbar>
        </Stack>
        dispatch({ type: "LOGIN_FAILURE", payload: err });

    })
};

