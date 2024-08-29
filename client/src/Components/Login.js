import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                    <input id="pass" type="text" onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <input type="button" text="Login" onClick={ () => {
                    console.log("Success, " + username + " " + password);
                }}/>
            </form>
        </>
    )
}

export default Login;