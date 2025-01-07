import "../styles/App.css"
import { useState } from "react";

function Accordion(props) {
    const [isActive, setIsActive] = useState(false);

    return (
        // create accordion container and insert data passed
        <div 
            className="accordion" 
            onClick={() => setIsActive(!isActive)}>
            <div className="accordion-icon">
                    {isActive ? '-' : '+'}
            </div>
            {isActive && <div className="panel">
                {props.data}
            </div>}
        </div>
    );
}

// FIX HEADER ISSUE, MAKE SEPARATE FROM PARENT CONTAINER

export default Accordion;