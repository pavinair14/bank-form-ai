export type FieldType = "text" | "number" | "checkbox" | "date";

export type FieldValue = string | number | boolean;

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface PageSize {
    width: number;
    height: number;
}

export interface PixelBox {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface PdfField {
    id: string;
    label: string;
    type: FieldType;
    value: string | number | boolean;
    page: number;
    boundingBox: BoundingBox;
}

/**
 * PDF.js Page object type
 * Represents a single page from a PDF document
 */
export interface PDFPageProxy {
    getViewport(options: { scale: number }): PageSize;
}