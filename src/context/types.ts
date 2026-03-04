import type { FieldType, FieldValue } from "@/features/pdf/types";
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
}

export interface State {
    fields: FormField[];
    focusedFieldId: string | null;
}

// Actions that can be dispatched to update the state
// - SET_FIELDS replaces the entire field list
// - UPDATE_FIELD modifies a single field's value
// - SET_FOCUS tracks which field is currently focused

export type Action =
    | { type: "SET_FIELDS"; payload: FormField[] }
    | { type: "UPDATE_FIELD"; payload: { id: string; value: FieldValue } }
    | { type: "SET_FOCUS"; payload: string | null };


export interface FieldContextValue {
    state: State;
    dispatch: Dispatch<Action>;
    setFields: (fields: FormField[]) => void;
    updateField: (id: string, value: FieldValue) => void;
    setFocus: (id: string | null) => void;
}