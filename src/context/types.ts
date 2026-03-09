import type { FieldType } from "@/features/pdf/types";
import type { Dispatch } from "react";

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    value: string | number | boolean;
    boundingBox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    score?: number;
    readOnly?: boolean
}

type PdfStatus = "loading" | "success" | "error";

export interface State {
    fields: FormField[];
    focusedFieldId: string | null;
    pdfStatus: PdfStatus | null;
}

// Actions that can be dispatched to update the state
// - SET_FIELDS replaces the entire field list
// - PDF_STATUS tracks the pdf status
// - SET_FOCUS tracks which field is currently focused

export type Action =
    | { type: "SET_FIELDS"; payload: FormField[] }
    | { type: "SET_FOCUS"; payload: string | null }
    | { type: "PDF_STATUS", payload: PdfStatus | null }



export interface FieldContextValue {
    state: State;
    dispatch: Dispatch<Action>;
}