import './Header.css';

import { Link } from "react-router-dom";
import { Theme, useIsThemeDark, useTheme } from './Theme/ThemeProvider';


export default function Header() {
    const theme = useTheme();
    const isDark = useIsThemeDark();
    const dark = isDark ? " dark " : "";

    const onChangeTheme = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if(theme.setTheme){
            const chek = event.target.checked;
            theme.setTheme(chek? Theme.dark : Theme.light);
        }
    }

    return (
        <header className={"header-main"+dark}>
            <div className='left'>
                <a href="/" className="mainName">FileSharingService</a>
                <Link to="/" className="link">Home</Link>
            </div>
            <div className='right'>
                <span className='theme'>Theme</span>
                <input onChange={onChangeTheme} className='toggle100' type="checkbox" id="switch" />
                <label className='toggle100_label' htmlFor="switch"></label>
            </div>
        </header>
    )
}