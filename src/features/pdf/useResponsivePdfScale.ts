import { useState, useEffect } from "react";

export const useResponsivePdfScale = (
    pageSize: { width: number; height: number },
    containerRef: React.RefObject<HTMLDivElement | null>
) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current && pageSize.width && pageSize.height) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
                // Fit PDF to both width and height
                const widthScale = containerWidth / pageSize.width;
                const heightScale = containerHeight / pageSize.height;
                setScale(Math.min(widthScale, heightScale, 1));
            }
        };
        window.addEventListener("resize", updateScale);
        updateScale();
        return () => window.removeEventListener("resize", updateScale);
    }, [pageSize.width, pageSize.height, containerRef]);

    return scale;
}
