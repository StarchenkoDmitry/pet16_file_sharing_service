import './SunMoonToggle.css';

import { Link } from "react-router-dom";



export default function SunMoonToggle() {
    return (
        <>
            <input type="checkbox" id="toggle_checkbox"/>
            <label htmlFor="toggle_checkbox">
                <div id="star">
                    <div className="star" id="star-1">★</div>
                    <div className="star" id="star-2">★</div>
                </div>
                <div id="moon"></div>
            </label>
        </>
    )
}




