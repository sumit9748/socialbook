import { axiosInstance } from "./config";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';

export default loginCall = (userCredential, dispatch) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch({ type: "LOGIN_START" });

        const loginSign = async () => {
            await axiosInstance.post("auth/login", userCredential).then((res) => {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

            }).catch((err) => {
                dispatch({ type: "LOGIN_FAILURE", payload: err });
                setOpen(true);

            })
        }; loginSign();

    }, [])


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {`User credentials do not match`}
                </Alert>
            </Snackbar>
        </Stack>
    )

};

