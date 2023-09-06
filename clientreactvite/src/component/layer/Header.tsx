import './Header.css';

import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="header-main">
            <a href="/" className="mainName">FileSharingService</a>
            <Link to="/" className="link">Home</Link>
            <Link to="/createurlRedirect" className="link">Create Url</Link>
            <Link to="/upload" className="link">Upload Files</Link>
        </header>
    )
}


/*
    1.LOGO
    2.home
    3.createUrl.


    9.Локализация.
    0.тема.
*/





// export default function Header() {
//     return (
//         <header className="header-main">
//             <a href="/" className="header-main_title">FileSharingService</a>
//             <Link to="/" className="header-main_logo">Home</Link>
//             <Link to="/upload" className="header-main_logo">Upload Files</Link>
//             <Link to="/upload/34425581" className="header-main_logo">UF 34425581</Link>
//             <Link to="/upload/45767688" className="header-main_logo">UF 45767688</Link>
//             <Link to="/download" className="header-main_logo">Download</Link>
//             <Link to="/test" className="header-main_logo">Test</Link>
//             <Link to="/test2" className="header-main_logo">Test2</Link>
//         </header>
//     )
// }

//<HeaderAccount></HeaderAccount>


{/* <span>dsfdf</span>
<input id="dsgfsdg" name="gfdogou3jn" />
<button>Button click</button> */}