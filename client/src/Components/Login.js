import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    return (
        <>
            <form id="login-form">
                <div>
                    <label htmlFor="user">Username:</label>
                    <input id="user"type="text" onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" type={showPass? "text" : "password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <input id="show-pass-checkbox"type="checkbox" onClick={() => {
                        setShowPass(!showPass);
                    }}/>
                    <label htmlFor="show-pass-checkbox">Show Password?</label>
                <input type="button" value="Login" onClick={ () => {
                    console.log("Success, " + username + " " + password);
                    setUsername('');
                    setPassword('');
                }}/>
            </form>
        </>
    )
}

export default Login;