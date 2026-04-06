import type {OverviewCard} from "../types/dashboard.ts";
import MetricCard from "./MetricCard.tsx";
import Card from "../../layout/Card.tsx";
import {cn} from "../../utils/cn.ts";

interface MetricCardsGridProps {
    cards: OverviewCard[];
    emptyMessage?: string;
    className?: string;
}

const MetricCardsGrid = ({
    cards,
    emptyMessage = "No metrics are available for this selection.",
    className
}: MetricCardsGridProps) => {
    if (cards.length === 0) {
        return (
            <Card className="border-dashed text-sm text-mono-500 dark:text-mono-400">
                {emptyMessage}
            </Card>
        );
    }

    return (
        <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
            {cards.map((card) => (
                <MetricCard
                    key={`${card.label}-${card.hint ?? "none"}`}
                    card={card}
                />
            ))}
        </div>
    );
};

export default MetricCardsGrid;
