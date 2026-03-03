import { useMemo, useState } from "react";
import { useFieldContext } from "@/context/FieldContext";
import { useForm } from "react-hook-form";
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

    const schema = useMemo(() => createFormSchema(fields), [fields]);

    const form = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: Object.fromEntries(
            fields.map((f) => [f.id, f.value])
        ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    // Form submission
    const onSubmit = async (data: Record<string, any>) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const result = await submitForm(data);
            setSubmitStatus({
                type: "success",
                message: `Form submitted successfully (ID: ${result.id})`,
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
        <Card className="p-6 m-6 h-[90vh] overflow-auto space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {fields.map((field) => (
                        <motion.div
                            key={field.id}
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <Label htmlFor={field.id}>{field.label}</Label>

                            {field.type === "checkbox" ? (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={field.id}
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
                                    />
                                </div>
                            ) : (
                                <>
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.label}
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
                                        className={
                                            errors[field.id] ? "border-red-500" : ""
                                        }
                                    />

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
                <motion.div variants={itemVariants}>
                    <Button
                        type="submit"
                        className="w-full"
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