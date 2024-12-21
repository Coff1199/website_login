import "./Accordion.js"
import Accordion from "./Accordion.js";

function Header(props) {
    return (
        <>
        <div className="App">
        <div className="App-header">
            <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/create-account">Create Account</a></li>
                <li><Accordion data="test"/></li>
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