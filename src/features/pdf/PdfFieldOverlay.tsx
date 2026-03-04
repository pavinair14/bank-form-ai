import { motion } from "framer-motion";
import { pulseVariants, highlightVariants } from "./animation";
import type { PixelBox } from "./types";

interface PdfFieldOverlayProps {
    pixelizedFields: Array<{
        id: string;
        box: PixelBox;
    }>;
    focusedFieldId?: string | null;
    scale: number;
}

export const PdfFieldOverlay = ({ pixelizedFields, focusedFieldId, scale }: PdfFieldOverlayProps) => (
    <>
        {pixelizedFields.map((field) => {
            const isFocused = field.id === focusedFieldId;
            return (
                <motion.div
                    key={field.id}
                    initial="initial"
                    animate={isFocused ? "animate" : "initial"}
                    exit="exit"
                    variants={isFocused ? pulseVariants : highlightVariants}
                    style={{
                        position: "absolute",
                        left: field.box.left * scale,
                        top: field.box.top * scale,
                        width: field.box.width * scale,
                        height: field.box.height * scale,
                        border: isFocused ? "2px solid green" : "1px solid rgba(0,0,255,0.4)",
                        background: isFocused ? "rgba(0,128,0,0.2)" : "rgba(0,0,255,0.1)",
                        borderRadius: "2px",
                        boxShadow: isFocused ? "0 0 15px rgba(0, 128, 0, 0.8)" : "none",
                    }}
                />
            );
        })}
    </>
);
