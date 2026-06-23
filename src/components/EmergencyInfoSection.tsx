import type { ReactNode } from "react";

type EmergencyInfoSectionProps<T> = {
    title: string;
    items: T[];
    renderItem: (item: T) => ReactNode;
};

export function EmergencyInfoSection<T>({
    title,
    items,
    renderItem,
}: EmergencyInfoSectionProps<T>) {
    return (
        <section>
            <h2>{title}</h2>

            {items.length === 0 ? (
                <p>None</p>
            ) : (
                items.map(renderItem)
            )}
        </section>
    );
}