import "./Accordion.js"
import Accordion from "./Accordion.js";

function Header(props) {
    const accordElems = (
        <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/create-account">Create Account</a></li>
        </ul>
    );

    return (
        <>
        <div className="App">
            <div className="App-header">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><Accordion data={accordElems}/></li>
                </ul>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;