import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    return (
        <>
            <form id="login-form" onSubmit={ (e) => {
                    e.preventDefault();
                    if (username && password) {
                        console.log("Success, " + username + " " + password);
                        fetch('/api/login', {
                            headers: {'Content-Type': 'application/json'},
                            method: "POST",
                            body: JSON.stringify({username: username, password: password})
                        }).then((res) => {

                        })
                        setUsername('');
                        setPassword('');
                    } else {
                        console.log("empty")
                    }
                }}>
                <div>
                    <label htmlFor="user">Username:</label>
                    <input id="user"type="text" value= {username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" value={password} type={showPass? "text" : "password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <input id="show-pass-checkbox"type="checkbox" onClick={() => {
                        setShowPass(!showPass);
                    }}/>
                    <label htmlFor="show-pass-checkbox">Show Password?</label>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default Login;