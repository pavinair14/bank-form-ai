import { useContext } from "react";
import { FieldContext } from "./FieldContext";

/**
 * Custom hook for consuming the field context
 * Throws error if used outside of Provider.
 */
export const useFieldContext = () => {
    const context = useContext(FieldContext);
    if (!context) throw new Error("Must be used inside FieldProvider");
    return context;
};