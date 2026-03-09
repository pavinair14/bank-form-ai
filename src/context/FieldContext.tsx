import { createContext } from "react";
import type { State, Action, FieldContextValue } from "./types";


// Default/initial state used by the reducer
export const initialState: State = {
    fields: [],
    focusedFieldId: null,
    pdfStatus: "loading"
};

/**
 * Reducer managing field state transitions.
 *
 * @param state - current field
 * @param action - action describing the update
 * @returns updated state after applying the actions
 */
export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_FIELDS":
            // replace the entire fields array
            return { ...state, fields: action.payload };

        case "SET_FOCUS":
            // set or clear the currently focused field
            return { ...state, focusedFieldId: action.payload };

        case "PDF_STATUS":
            return {
                ...state,
                pdfStatus: action.payload
            };

        default:
            return state;
    }
}

export const FieldContext = createContext<FieldContextValue | null>(null);