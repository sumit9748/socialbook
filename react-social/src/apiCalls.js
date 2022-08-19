import { axiosInstance } from "./config";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";


export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axiosInstance.post("auth/login", userCredential)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        <SnackbarLogin open={true} message={`welcome ${res.data.email}`} />

        return res;
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
        <SnackbarLogin open={true} message={`${err}`} />

    }
};

export const SnackbarLogin = ({ open, message }) => {


    <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
            {`${message}`}
        </Alert>
    </Snackbar>
}
