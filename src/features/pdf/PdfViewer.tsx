import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useFieldContext } from "@/context/FieldContext";
import { motion } from "framer-motion";
import pdfForm from "@/assets/sample-form.pdf"
import { toPixels, pulseVariants, highlightVariants } from "./animation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
    const { state } = useFieldContext();
    const { fields, focusedFieldId } = state;

    const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
    const scale = 1;

    const onPageLoad = (page: any) => {
        const viewport = page.getViewport({ scale });
        setPageSize({ width: viewport.width, height: viewport.height });
    };

    return (
        <div className="relative lg:h-[90vh]">
            <Document file={pdfForm}>
                <Page pageNumber={1} scale={scale} onLoadSuccess={onPageLoad} />
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
                {fields.map((field) => {
                    const box = toPixels(field.boundingBox, pageSize);
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
                                left: box.left,
                                top: box.top,
                                width: box.width,
                                height: box.height,
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
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default PdfViewer;