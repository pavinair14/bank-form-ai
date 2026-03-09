import { useEffect, useState, useCallback, useMemo } from "react";
import { useFieldContext } from "@/context/useFieldContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema } from "@/features/form/schema";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { submitForm } from "./submitForm";
import {
    containerVariants,
    itemVariants,
    statusVariants,
} from "./animations";

const DynamicForm = () => {
    const { state, dispatch } = useFieldContext();
    const { fields, pdfStatus } = state;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // schema
    const schema = useMemo(() => createFormSchema(fields), [fields]);


    const form = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    // setting default values
    useEffect(() => {
        if (pdfStatus === "success" && fields.length > 0) {
            const values = Object.fromEntries(
                fields.map((f) => [f.id, f.value ?? ""])
            );
            reset(values);
        }
    }, [fields, reset]);


    // hides success message after 3 seconds
    useEffect(() => {
        if (submitStatus?.type === "success") {
            const timer = setTimeout(() => setSubmitStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);


    // form submission
    const onSubmit = useCallback(
        async (data: Record<string, unknown>) => {
            setIsSubmitting(true);
            setSubmitStatus(null);

            try {
                await submitForm(data as Record<string, string | number | boolean>);

                setSubmitStatus({
                    type: "success",
                    message: "Form submitted successfully",
                });
            } catch (err) {
                setSubmitStatus({
                    type: "error",
                    message:
                        err instanceof Error
                            ? err.message
                            : "Unknown submission error",
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        []
    );


    return (
        <Card className="p-6 h-full min-h-[80vh] overflow-auto space-y-6 w-full">
            {pdfStatus === "success" ?
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                        variants={containerVariants}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0"
                    >
                        {fields.map((field) => (
                            <motion.div
                                key={field.id}
                                variants={itemVariants}
                                className={`space-y-2 ${field.type === "checkbox" ? "col-span-2" : ""
                                    }`}
                            >
                                {/* Label */}
                                {field.type !== "checkbox" && (
                                    <Label htmlFor={field.id} className="text-base">
                                        {field.label}
                                    </Label>
                                )}

                                {/* Checkbox */}
                                {field.type === "checkbox" ? (
                                    <Controller
                                        name={field.id}
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={field.id}
                                                    checked={Boolean(value)}
                                                    onCheckedChange={(checked) => onChange(checked)}
                                                    onFocus={() =>
                                                        dispatch({
                                                            type: "SET_FOCUS",
                                                            payload: field.id,
                                                        })
                                                    }
                                                    onBlur={() =>
                                                        dispatch({
                                                            type: "SET_FOCUS",
                                                            payload: null,
                                                        })
                                                    }
                                                />
                                                <Label
                                                    htmlFor={field.id}
                                                    className="cursor-pointer text-base"
                                                >
                                                    {field.label}
                                                </Label>
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <>
                                        <div className="flex">
                                            <Input
                                                id={field.id}
                                                type={field.type === "number" ? "number" : "text"}
                                                placeholder={
                                                    field.type === "date"
                                                        ? "DD/MM/YYYY"
                                                        : field.label
                                                }
                                                {...register(field.id)}
                                                onFocus={() =>
                                                    dispatch({
                                                        type: "SET_FOCUS",
                                                        payload: field.id,
                                                    })
                                                }
                                                onBlur={() =>
                                                    dispatch({
                                                        type: "SET_FOCUS",
                                                        payload: null,
                                                    })
                                                }
                                                readOnly={((field?.score ?? 0) >= 0.9) && field.readOnly}
                                                className={`text-base ${errors[field.id] ? "border-red-500" : ""
                                                    }`}
                                            />
                                        </div>
                                        {errors[field.id] && (
                                            <p className="text-sm text-red-500">
                                                {errors[field.id]?.message as string}
                                            </p>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Submit Button */}
                    {fields.length > 0 && (
                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-xl"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </motion.div>
                    )}

                    {/* Submit Status */}
                    <AnimatePresence>
                        {submitStatus && (
                            <motion.div
                                variants={statusVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.25 }}
                                className={`p-4 rounded-lg ${submitStatus.type === "success"
                                    ? "bg-green-50 text-green-800 border border-green-200"
                                    : "bg-red-50 text-red-800 border border-red-200"
                                    }`}
                            >
                                <p className="text-sm font-medium">
                                    {submitStatus.message}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form> : <p className="text-gray-700 text-sm">
                    Form will appear once the document loads.
                </p>}
        </Card>
    );
};

export default DynamicForm;