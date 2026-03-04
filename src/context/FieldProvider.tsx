import { useReducer, useCallback, useMemo, type ReactNode } from "react";
import { FieldContext, reducer, initialState } from "./FieldContext";
import type { FieldValue } from "@/features/pdf/types";
import type { FormField } from "./types";

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
