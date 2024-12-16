import { useState, useEffect } from "react";

const useRealtimeDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return {
    day: currentDate.getDate(),
    month: currentDate.toLocaleString("default", { month: "short" }), // e.g., "Nov"
    year: currentDate.getFullYear(),
    hours: currentDate.getHours(),
    minutes: currentDate.getMinutes(),
    seconds: currentDate.getSeconds(),
  };
};

export default useRealtimeDate;
