import React, { createContext, useContext, useState, useEffect } from "react";
import moment from 'moment';
const TimeContext = createContext();

export const TimeProvider = ({ children }) => {

    const [timeSpent, setTimeSpent] = useState(0);
    const startTimeRef = React.useRef(moment());
    const handleBeforeUnload = () => {
        const url = "http://localhost:1000/api/user/saveTime";
        const duration=moment.duration(moment().diff(startTimeRef.current)).asSeconds()
        localStorage.setItem("duration1",duration+ +(localStorage.getItem("duration1")??0))
        const payload = JSON.stringify({ duration:duration,"userId":localStorage.getItem('id')});
        
        navigator.sendBeacon(url, payload);
      };
    
      useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);
    useEffect(() => {
        const startTime=startTimeRef.current.clone().subtract(localStorage.getItem("duration1")??0,'seconds')
        console.log(startTime,localStorage.getItem("duration"));
        const interval = setInterval(() => {
            const duration=moment.duration(moment().diff(startTime))
            const formattedDuration = [
                String(Math.floor(duration.asHours())).padStart(2, '0'), // Hours
                String(duration.minutes()).padStart(2, '0'),            // Minutes
                String(duration.seconds()).padStart(2, '0')             // Seconds
              ].join(':')
           setTimeSpent(formattedDuration);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  


    return(
        <TimeContext.Provider value={{timeSpent}}>
            {children}
        </TimeContext.Provider>
    )
};

export const useTimeTracker = () => useContext(TimeContext);