
export const toPixels = (box: any, pageSize: any) => ({
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
    initial: { opacity: 0.2, boxShadow: "0 0 0px rgba(255, 0, 0, 0)" },
    animate: {
        opacity: [0.2, 0.35, 0.2],
        boxShadow: [
            "0 0 0px rgba(255, 0, 0, 0.3)",
            "0 0 20px rgba(255, 0, 0, 0.6)",
            "0 0 0px rgba(255, 0, 0, 0.3)",
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
        },
    },
};