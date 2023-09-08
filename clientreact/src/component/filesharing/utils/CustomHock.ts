import { useEffect, useState } from "react";

export function useTimerok(milisecond: number = 1000){
    const [timer, setTimer] = useState(0);

    const addTimer = () => {
        // console.log('timer', timer);
        setTimer(timer + 1);
    }

    useEffect(() => {
        // console.log('Use effect');
        const handeler = setInterval(addTimer, milisecond);
        return ()=>{clearInterval(handeler);}
    })
}