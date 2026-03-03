import type { FieldType, FieldValue } from "@/features/pdf/types";
import { createContext, useCallback, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";


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

interface State {
    fields: FormField[];
    focusedFieldId: string | null;
}

// Actions that can be dispatched to update the state
// - SET_FIELDS replaces the entire field list
// - UPDATE_FIELD modifies a single field's value
// - SET_FOCUS tracks which field is currently focused

type Action =
    | { type: "SET_FIELDS"; payload: FormField[] }
    | { type: "UPDATE_FIELD"; payload: { id: string; value: FieldValue } }
    | { type: "SET_FOCUS"; payload: string | null };

// Default/initial state used by the reducer
const initialState: State = {
    fields: [],
    focusedFieldId: null,
};

/**
 * Reducer managing field state transitions.
 *
 * @param state - current field
 * @param action - action describing the update
 * @returns updated state after applying the actions
 */
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_FIELDS":
            // replace the entire fields array
            return { ...state, fields: action.payload };

        case "UPDATE_FIELD":
            // update value of single field by id
            return {
                ...state,
                fields: state.fields.map((field) =>
                    field.id === action.payload.id
                        ? { ...field, value: action.payload.value }
                        : field
                ),
            };

        case "SET_FOCUS":
            // set or clear the currently focused field
            return { ...state, focusedFieldId: action.payload };

        default:
            return state;
    }
}

interface FieldContextValue {
    state: State;
    dispatch: Dispatch<Action>;
    setFields: (fields: FormField[]) => void;
    updateField: (id: string, value: FieldValue) => void;
    setFocus: (id: string | null) => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export const FieldProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setFields = useCallback(
        (fields: FormField[]) => {
            dispatch({ type: "SET_FIELDS", payload: fields });
        },
        [dispatch]
    );

    const updateField = useCallback(
        (id: string, value: FieldValue) => {
            dispatch({ type: "UPDATE_FIELD", payload: { id, value } });
        },
        [dispatch]
    );

    const setFocus = useCallback(
        (id: string | null) => {
            dispatch({ type: "SET_FOCUS", payload: id });
        },
        [dispatch]
    );

    const value = useMemo(
        () => ({ state, dispatch, setFields, updateField, setFocus }),
        [state, dispatch, setFields, updateField, setFocus]
    );

    return (
        <FieldContext.Provider value={value}>
            {children}
        </FieldContext.Provider>
    );
};

/**
 * Custom hook for consuming the field context
 * Throws error if used outside of Provider.
 */
export const useFieldContext = () => {
    const context = useContext(FieldContext);
    if (!context) throw new Error("Must be used inside FieldProvider");
    return context;
};