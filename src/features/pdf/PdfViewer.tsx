import { useState, useCallback, useMemo } from "react";
import "@/lib/pdfWorker";
import { Document, Page } from "react-pdf";
import { useFieldContext } from "@/context/FieldContext";
import { motion } from "framer-motion";
import pdfForm from "@/assets/sample-form.pdf"
import { toPixels, pulseVariants, highlightVariants } from "./animation";
import type { PDFPageProxy } from "./types";

const PdfViewer = () => {
    const { state } = useFieldContext();
    const { fields, focusedFieldId } = state;

    const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
    const scale = 1;

    // Memoize onPageLoad callback
    const onPageLoad = useCallback((page: PDFPageProxy) => {
        const viewport = page.getViewport({ scale });
        setPageSize({ width: viewport.width, height: viewport.height });
    }, [scale]);

    // Memoize pixel calculations for all fields
    const pixelizedFields = useMemo(() =>
        fields.map((field) => ({
            ...field,
            box: toPixels(field.boundingBox, pageSize),
        })), [fields, pageSize]);

    return (
        <div className="relative lg:h-[90vh]">
            <Document file={pdfForm}>
                <Page pageNumber={1} scale={scale} onLoadSuccess={onPageLoad} renderTextLayer={false}
                    renderAnnotationLayer={false} />
            </Document>

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: pageSize.width,
                    height: pageSize.height,
                    pointerEvents: "none",
                }}
            >
                {pixelizedFields.map((field) => {
                    const isFocused = field.id === focusedFieldId;
                    const boxStyle = {
                        position: "absolute" as const,
                        left: field.box.left,
                        top: field.box.top,
                        width: field.box.width,
                        height: field.box.height,
                        border: isFocused
                            ? "2px solid green"
                            : "1px solid rgba(0,0,255,0.4)",
                        background: isFocused
                            ? "rgba(0,128,0,0.2)"
                            : "rgba(0,0,255,0.1)",
                        borderRadius: "2px",
                        boxShadow: isFocused
                            ? "0 0 15px rgba(0, 128, 0, 0.8)"
                            : "none",
                    } as const;

                    return (
                        <motion.div
                            key={field.id}
                            initial="initial"
                            animate={isFocused ? "animate" : "initial"}
                            exit="exit"
                            variants={isFocused ? pulseVariants : highlightVariants}
                            style={boxStyle}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default PdfViewer;