import { z } from "zod";
import type { FormField } from "@/context/types";

const REQUIRED = (label: string) =>
    z.string().min(1, `${label} is required`);

const OPTIONAL_TEXT = ["last_name", "post_office"];

const NUMERIC_RULES: Record<
    string,
    { regex: RegExp; message: (label: string) => string }
> = {
    account_number: {
        regex: /^\d{9}$/,
        message: (label) => `${label} must be exactly 9 digits`,
    },
    mobile_number: {
        regex: /^\d{10}$/,
        message: (label) => `${label} must be exactly 10 digits`,
    },
    primary_acc_id: {
        regex: /^\d{10}$/,
        message: (label) => `${label} must be exactly 10 digits`,
    },
};

export function createFormSchema(fields: FormField[]) {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    for (const field of fields) {
        switch (field.type) {
            case "checkbox":
                schemaShape[field.id] = z.boolean();
                break;

            case "number": {
                const numericRule = NUMERIC_RULES[field.id];

                if (numericRule) {
                    schemaShape[field.id] = REQUIRED(field.label).regex(
                        numericRule.regex,
                        numericRule.message(field.label)
                    );
                } else {
                    schemaShape[field.id] = REQUIRED(field.label);
                }
                break;
            }

            case "date":
                schemaShape[field.id] = z
                    .string()
                    .regex(
                        /^\d{2}\/\d{2}\/\d{4}$/,
                        `${field.label} must be in DD/MM/YYYY format`
                    );
                break;

            default: {
                if (OPTIONAL_TEXT.includes(field.id)) {
                    schemaShape[field.id] = z.string().optional().or(z.literal(""));
                } else {
                    schemaShape[field.id] = REQUIRED(field.label);
                }
            }
        }
    }

    return z.object(schemaShape);
}