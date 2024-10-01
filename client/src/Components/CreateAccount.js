import { useState } from "react";
import '../styles/form.css';
import {redirect} from 'react-router-dom';

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    return (
        <>
        <h2>Create Account</h2>
            <form id="create-account-form" onSubmit={ (e) => {
                    e.preventDefault();
                    // ad verification for email and verifictation email
                    // find some way to remove unactivated emails after some time
                    // create loading page and confirmation page on creation of acc or login
                    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
                    let newErrors = {};

                    // Validate Password
                    if (!password) {
                        newErrors.password = 'Password is required';
                    } else if (!passwordRegex.test(password)) {
                        newErrors.password = 'Password must contain at least one lowercase character, an uppercase character, a number, a special character, and be between 8 and 15 characters long';
                    }

                    // Validate Email
                    if (!email) {
                        newErrors.email = 'Email is required';
                    } else if (!validateEmailFormat(email)) {
                        newErrors.email = 'Invalid email format';
                    }

                    // Validate Username
                    if (!username) {
                        newErrors.username = 'Username is required';
                    }

                    // Set errors if any validations fail
                    if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                        return; // Stop further execution if there are validation errors
                    }

                    // If no errors, proceed with account creation
                    fetch('/api/create-account/', {
                        // attempt to add data from login to account
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify({
                            username: username,
                            email: email,
                            password: password,
                            dateCreated: new Date()
                        })
                    })
                    .then(res => {
                        if (!res.ok) {
                            return res.json().then(data => {
                                console.log(data.message);
                            });
                        }
                        console.log('Successfully created account and added to database');
                        // Clear form fields after successful submission
                        setUsername('');
                        setPassword('');
                        setEmail('');

                        // redirect to confirmation page
                       // redirect("/confirmation");

                        return res.json();
                    })
                    .catch(error => {
                        console.error('Error creating account:', error);
                    });
                }}>
                <div className="field">
                    <label htmlFor="user">Username:</label>
                    <input id="user"type="text" value= {username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    {errors.username && <span className="required">{errors.username}</span>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input id="email"type="email" value= {email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    {errors.email && <span className="required">{errors.email}</span>}
                </div>
                <div className="field">
                    <label htmlFor="pass">Password:</label>
                    <input id="pass" value={password} type={showPass? "text" : "password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    {errors.password && <span className="required">{errors.password}</span>}
                </div>
                <input id="show-pass-checkbox"type="checkbox" onClick={() => {
                        setShowPass(!showPass);
                    }}/>
                    <label id="checkbox-label" htmlFor="show-pass-checkbox">Show Password?</label>
                <input type="submit" value="Create Account" />
            </form>
        </>
    )
}

export default Login;