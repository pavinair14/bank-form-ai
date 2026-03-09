import { useReducer, useMemo, type ReactNode } from "react";
import { FieldContext, reducer, initialState } from "./FieldContext";

export const FieldProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(
        () => ({ state, dispatch }),
        [state, dispatch]
    );

    return (
        <FieldContext.Provider value={value}>
            {children}
        </FieldContext.Provider>
    );
};
