import "./login.css"
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {

    const email = useRef();
    const password = useRef();

    const { user, isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };
    console.log(user);
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
                        <button className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "create a new account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
