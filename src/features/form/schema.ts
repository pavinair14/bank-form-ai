import { z } from "zod";
import type { FormField } from "@/context/FieldContext";

// schema generator based on field configuration
export function createFormSchema(fields: FormField[]) {
    const schemaObject: Record<string, z.ZodTypeAny> = {};

    for (const field of fields) {
        if (field.type === "checkbox") {
            schemaObject[field.id] = z.boolean();
        } else if (field.type === "number") {
            schemaObject[field.id] = z.string().min(1, `${field.label} is required`);
        } else {
            // text type
            schemaObject[field.id] = z.string().min(1, `${field.label} is required`);
        }
    }

    return z.object(schemaObject);
}