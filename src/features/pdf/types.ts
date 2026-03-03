export type FieldType = "text" | "number" | "checkbox" | "date";

export interface PdfField {
    id: string;
    label: string;
    type: FieldType;
    value: string | number | boolean;
    page: number;
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}