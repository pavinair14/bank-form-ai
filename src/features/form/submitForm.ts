export interface SubmitResponse {
    id: number;
}

export async function submitForm(
    data: Record<string, any>
): Promise<SubmitResponse> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}