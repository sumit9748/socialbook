import "./login.css"
import * as React from 'react';
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

export default function Login() {

    const email = useRef();
    const password = useRef();

    const { error, isFetching, dispatch } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
        setOpen(true);
    };

    const action = (
        <React.Fragment>
            <CloseIcon fontSize="small" />
        </React.Fragment>
    );

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialBook</h3>
                    <span className="loginDesc">The Book helps to connect you with the world... SocialBook</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="password" type="password" minLength="6" required className="loginInput" ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>
                        {error && (
                            <><Snackbar
                                open={open}
                                autoHideDuration={6000}

                                sx={{ backgroundColor: "red", color: "white" }}
                                message="User Credentials is not matching.."
                                action={action}

                            />

                            </>)}
                        <button className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "create a new account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

