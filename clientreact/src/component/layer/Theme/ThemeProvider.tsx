import './ThemeProvider.css';
import { createContext, useContext, useEffect, useState } from "react";

export enum Theme{
    dark,
    light,
}

interface ITheme{
    theme:Theme;
    setTheme?:(nTheme:Theme)=>void;
}

const defaultInit:ITheme = { theme:Theme.light };

const ThemeContext = createContext(defaultInit);


interface Props{
    children:React.ReactNode;
}
const ThemeProvider = ({children}:Props)=>{ 
    const [_theme, _setTheme] = useState(Theme.light);

    const root:HTMLElement = document.getElementById('root') as HTMLElement;
  
    const mycontext = {
        theme:_theme,
        setTheme: (nTheme:Theme)=>{ _setTheme(nTheme); }
    };

    useEffect(()=>{
        if(_theme === Theme.dark)
            root.classList.add("dark");
        return ()=>{
            if(_theme === Theme.dark)
                root.classList.remove("dark");
        }
    },[_theme]);
    

    return (
        <ThemeContext.Provider value={mycontext}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;

export function useTheme(){
    return useContext(ThemeContext);
}
export function useIsThemeDark():boolean{
    const theme = useContext(ThemeContext);
    return theme.theme === Theme.dark;
}