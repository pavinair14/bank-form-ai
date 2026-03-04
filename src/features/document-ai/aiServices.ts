import type { FormField } from "@/context/types";
import { mockFormData } from "./data";

/**
 * Fetches form data from a simulated API endpoint
 * @returns Promise resolving to form field data
 */
export async function fetchFormData(): Promise<FormField[]> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulate API response with the mock data
        const response = {
            ok: true,
            json: async () => ({ data: mockFormData }),
        };

        if (!response.ok) {
            throw new Error("Failed to fetch form data from API");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching form data:", error);
        // Fallback to mock data in case of error
        return mockFormData;
    }
}

