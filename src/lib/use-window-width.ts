import { useEffect, useState } from "react";

export const useWindowWidth = (): number => {
    const [width, setWidth] = useState(1920);

    useEffect(() => {
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};
