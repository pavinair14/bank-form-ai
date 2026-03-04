import { useState, useEffect } from "react";

export function useResponsivePdfScale(pageSize: { width: number }, containerRef: React.RefObject<HTMLDivElement | null>) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current && pageSize.width) {
                const containerWidth = containerRef.current.offsetWidth;
                setScale(Math.min(containerWidth / pageSize.width, 1));
            }
        };
        window.addEventListener("resize", updateScale);
        updateScale();
        return () => window.removeEventListener("resize", updateScale);
    }, [pageSize.width, containerRef]);

    return scale;
}
