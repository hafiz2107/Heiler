import { useTimer } from 'react-timer-hook';

export function Timer() {
    const {
        seconds,
        start,
        restart,
    } = useTimer({ expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30), onExpire: () => console.warn('') });
    
    return {start , restart , seconds}
};


