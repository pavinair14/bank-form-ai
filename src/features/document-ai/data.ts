import type { FormField } from "@/context/FieldContext";

export const mockFormData: FormField[] = [
    {
        id: "account_number",
        label: "CIF ID",
        type: "text",
        value: "321502150",
        boundingBox: { x: 0.1820345, y: 0.21984027, width: 0.30, height: 0.02 },
    },
    {
        id: "customer_name",
        label: "Customer Name",
        type: "text",
        value: "Rahul Sharma",
        boundingBox: { x: 0.2825699, y: 0.28541404, width: 0.45, height: 0.02 },
    },
    {
        id: "primary_acc_id",
        label: "Primary Account ID",
        type: "text",
        value: "4458312548",
        boundingBox: { x: 0.55, y: 0.219, width: 0.37, height: 0.02 },
    },
    {
        id: "mobile_number",
        label: "Mobile Number",
        type: "number",
        value: "6378951260",
        boundingBox: { x: 0.35633552, y: 0.4384195, width: 0.17, height: 0.015 },
    },
    {
        id: "pan_number",
        label: "PAN Number",
        type: "text",
        value: "FTF8512GM",
        boundingBox: { x: 0.7085068, y: 0.4384195, width: 0.17, height: 0.015 },
    },
    {
        id: "email",
        label: "Email ID",
        type: "text",
        value: "kultheepri@gmail.com",
        boundingBox: { x: 0.36168948, y: 0.45901638, width: 0.40, height: 0.015 },
    },
    {
        id: "internet_banking",
        label: "Internet Banking",
        type: "checkbox",
        value: true,
        boundingBox: { x: 0.75, y: 0.776839, width: 0.05, height: 0.03 },
    },
];