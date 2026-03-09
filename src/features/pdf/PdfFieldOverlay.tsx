import { motion } from "framer-motion";
import { pulseVariants, highlightVariants, getConfidenceColor } from "./animation";
import type { PdfFieldOverlayProps } from "./types";

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
                        borderRadius: "2px",
                        ...getConfidenceColor(field.score)
                    }}
                />
            );
        })}
    </>
);
