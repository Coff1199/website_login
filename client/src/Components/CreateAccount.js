import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    return (
        <>
            <form id="create-account-form" onSubmit={ (e) => {
                    e.preventDefault();
                    if (username && password && email) {
                        fetch('/api/create-account', {
                            headers: {'Content-Type': 'application/json'},
                            method: "POST",
                            body: JSON.stringify({username: username, email: email, password: password})
                        })
                        console.log("Successfully created account and added to database");
                    } else {
                        let newErrors = {}
                        if (!username) newErrors.username ='Username is required';
                        if (!email) newErrors.email = 'Email is required';
                        if (!password) newErrors.password = 'Password is required';
                        setErrors(newErrors);
                    }
                    setUsername('');
                    setPassword('');
                    setEmail('');
                }}>
                <div>
                    <label htmlFor="user">Username:</label>
                    <input id="user"type="text" value= {username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    {errors.username && <span className="required">{errors.username}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email"type="email" value= {email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    {errors.email && <span className="required">{errors.email}</span>}
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
                <input type="submit" value="Create Account" />
            </form>
        </>
    )
}

export default Login;