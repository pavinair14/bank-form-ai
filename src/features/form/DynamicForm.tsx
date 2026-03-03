import { useMemo, useState, useEffect } from "react";
import { useFieldContext } from "@/context/FieldContext";
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
import { containerVariants, itemVariants, statusVariants } from "./animations";

const DynamicForm = () => {
    const { state, dispatch } = useFieldContext();
    const { fields } = state;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // hide the success message after a short delay
    useEffect(() => {
        if (submitStatus?.type === "success" || isSubmitting) {
            const timer = setTimeout(() => setSubmitStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus, isSubmitting]);

    const schema = useMemo(() => createFormSchema(fields), [fields]);

    const form = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: Object.fromEntries(
            fields.map((f) => [f.id, f.value, f.type])
        ),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    // Form submission
    const onSubmit = async (data: Record<string, any>) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await submitForm(data);
            setSubmitStatus({
                type: "success",
                message: `Form submitted successfully`,
            });
        } catch (err) {
            setSubmitStatus({
                type: "error",
                message:
                    err instanceof Error ? err.message : "Unknown submission error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Card className="p-6 m-6 h-[90vh] overflow-auto space-y-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-6"
                >
                    {fields.map((field) => (
                        <motion.div
                            key={field.id}
                            variants={itemVariants}
                            className={`space-y-2 ${field.type === "checkbox" ? "col-span-2" : ""}`}
                        >
                            {field.type !== "checkbox" && (
                                <Label htmlFor={field.id} className="text-base">{field.label}</Label>
                            )}

                            {field.type === "checkbox" ? (
                                <Controller
                                    name={field.id}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={field.id}
                                                checked={Boolean(value)}
                                                onCheckedChange={(checked) => {
                                                    onChange(checked);
                                                }}
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
                                            <Label htmlFor={field.id} className="cursor-pointer text-base">
                                                {field.label}
                                            </Label>
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <Input
                                        id={field.id}
                                        type="text"
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
                                        className={`text-base ${errors[field.id] ? "border-red-500" : ""
                                            }`}
                                    />

                                    {errors[field.id] && (
                                        <p className="text-base text-red-500">
                                            {errors[field.id]?.message as string}
                                        </p>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                    <Button
                        type="submit"
                        className="w-full text-base"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </motion.div>

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
            </form>
        </Card>
    );
}

export default DynamicForm;