import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [errors, setErrors] = useState({});
    return (
        <>
            <form id="login-form" onSubmit={ (e) => {
                    e.preventDefault();
                    if (username && password) {
                        console.log("Checking Login" + username + " " + password);
                        setErrors({});
                        /**fetch('/api/login', {
                            headers: {'Content-Type': 'application/json'},
                            method: "POST",
                            body: JSON.stringify({username: username, password: password})
                        }).then((res) => {

                        })**/
                    } else {
                        let newErrors = {}
                        if (!username) newErrors.username ='Username is required';
                        if (!password) newErrors.password = 'Password is required';
                        setErrors(newErrors);
                    }
                    setUsername('');
                    setPassword('');
                }}>
                <div>
                    <label htmlFor="user">Username:</label>
                    <input id="user"type="text" value= {username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    {errors.username && <span className="required">{errors.username}</span>}
                </div>
                <div>
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" value={password} type={showPass? "text" : "password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    {errors.password && <span className="required">{errors.password}</span>}
                </div>
                <input id="show-pass-checkbox"type="checkbox" onClick={() => {
                        setShowPass(!showPass);
                    }}/>
                    <label htmlFor="show-pass-checkbox">Show Password?</label>
                <input type="submit" value="Login" />
            </form>
            <div>
                <button onClick = { () => {
                    //change page
                }}>
                    Don't already have an account?
                </button>
            </div>
        </>
    )
}

export default Login;