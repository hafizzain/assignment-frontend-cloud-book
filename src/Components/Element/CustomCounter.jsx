import { useEffect, useState } from "react";

const CustomCounter = ({ start, end, duration }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        const increment = (end - start) / (duration / 100);
        const interval = setInterval(() => {
            setCount(prevCount => {
                if (prevCount >= end) {
                    clearInterval(interval);
                    return end;
                }
                return prevCount + increment;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [start, end, duration]);

    return <span>{Math.round(count)}</span>;
};

export default CustomCounter