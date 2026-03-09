import type { BoundingBox, PageSize, PixelBox } from "./types";

export const toPixels = (box: BoundingBox, pageSize: PageSize): PixelBox => ({
    left: box.x * pageSize.width,
    top: box.y * pageSize.height,
    width: box.width * pageSize.width,
    height: box.height * pageSize.height,
});

export const highlightVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const pulseVariants = {
    initial: { opacity: 0.8, boxShadow: "0 0 0px rgba(0, 128, 0, 0)" },
    animate: {
        opacity: [0.8, 0.35, 0.6],
        boxShadow: [
            "0 0 0px rgba(0, 128, 0, 0.3)",
            "0 0 20px rgba(0, 128, 0, 0.6)",
            "0 0 0px rgba(0, 128, 0, 0.3)",
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
        },
    },
};

export const getConfidenceColor = (score?: number) => {
    if (!score) {
        // default highlight
        return {
            border: "1px solid rgba(0, 123, 255, 1)",
            background: "rgba(0, 123, 255, 0.6)",
            boxShadow: "0 0 6px rgba(0,123,255,0.8)"

        };
    } else {
        if (score > 0.9) {
            // highlight for good score
            return {
                border: "1px solid rgba(0, 128, 0, 1)",
                background: "rgba(0, 128, 0, 0.6)",
                boxShadow: "0 0 15px rgba(34,197,94,0.8)"
            };
        } else if (score >= 0.7) {
            // warning highlight for medium score
            return {
                border: "1px solid rgba(255, 193, 7, 1)",
                background: "rgba(255, 193, 7, 0.6)",
                boxShadow: "0 0 6px rgba(255,193,7,0.8)"
            };
        } else {
            // highlight for worse score
            return {
                border: "1px solid rgba(220, 53, 69, 1)",
                background: "rgba(220, 53, 69, 0.6)",
                boxShadow: "0 0 6px rgba(220,53,69,0.8)"

            }
        };
    }
};