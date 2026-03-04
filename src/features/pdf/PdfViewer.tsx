
import { useState, useRef, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useFieldContext } from "@/context/useFieldContext";
import pdfForm from "@/assets/sample-form.pdf";
import { toPixels } from "./animation";
import type { PDFPageProxy } from "./types";
import { useResponsivePdfScale } from "./useResponsivePdfScale";
import { PdfFieldOverlay } from "./PdfFieldOverlay";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = () => {
    const { fields, focusedFieldId } = useFieldContext().state;
    const containerRef = useRef<HTMLDivElement>(null);
    const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
    const scale = useResponsivePdfScale(pageSize, containerRef);

    const onPageLoad = useCallback((page: PDFPageProxy) => {
        const viewport = page.getViewport({ scale: 1 });
        setPageSize({ width: viewport.width, height: viewport.height });
    }, []);

    // Memoize pixel calculations for all fields
    const pixelizedFields = useMemo(() =>
        fields.map((field) => ({
            ...field,
            box: toPixels(field.boundingBox, pageSize),
        })), [fields, pageSize]);

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-full"
            style={{ minHeight: "60vh", maxHeight: "90vh" }}
        >
            <Document file={pdfForm} className="w-full h-full">
                <Page
                    pageNumber={1}
                    scale={scale}
                    onLoadSuccess={onPageLoad}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="w-full h-auto"
                />
            </Document>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: pageSize.width * scale,
                    height: pageSize.height * scale,
                    pointerEvents: "none",
                }}
            >
                <PdfFieldOverlay pixelizedFields={pixelizedFields} focusedFieldId={focusedFieldId} scale={scale} />
            </div>
        </div>
    );
}

export default PdfViewer;