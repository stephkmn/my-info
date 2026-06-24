export type ColumnDef<T> = {
    key: keyof T;
    label: string;
    placeholder?: string;
    inputType?: "text" | "date" | "number" | "email";
    required?: boolean;
}
