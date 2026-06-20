export type ColumnDef<T> = {
    key: keyof T;
    label: string;
    placeholder?: string;
}