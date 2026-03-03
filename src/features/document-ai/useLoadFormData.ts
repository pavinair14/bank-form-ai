import { useEffect, useState } from "react";
import { useFieldContext } from "@/context/FieldContext";
import { fetchFormData } from "./aiServices";

export function useLoadFormData() {
    const { dispatch } = useFieldContext();
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setStatus("loading");
            try {
                const data = await fetchFormData();
                if (!isMounted) return;

                dispatch({ type: "SET_FIELDS", payload: data });
                setStatus("success");
            } catch (err) {
                if (!isMounted) return;

                const message =
                    err instanceof Error ? err.message : "Failed to load form data";
                setError(message);
                setStatus("error");
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return { status, error };
}