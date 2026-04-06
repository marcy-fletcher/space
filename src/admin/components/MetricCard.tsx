import Card from "../../layout/Card.tsx";
import Badge from "../../common/components/Badge.tsx";
import type {OverviewCard} from "../types/dashboard.ts";
import {cn} from "../../utils/cn.ts";

interface MetricCardProps {
    card: OverviewCard;
    className?: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US");

function formatMetricValue(card: OverviewCard): string {
    if (card.kind === "text") {
        return String(card.value);
    }

    const numericValue = typeof card.value === "number"
        ? card.value
        : Number(card.value);

    if (!Number.isFinite(numericValue)) {
        return String(card.value);
    }

    if (card.kind === "currency") {
        return currencyFormatter.format(numericValue);
    }

    if (card.kind === "percentage" || card.kind === "trend") {
        return `${numericValue}%`;
    }

    return numberFormatter.format(numericValue);
}

function getHintVariant(hint: string | null) {
    if (hint === "Period") {
        return "primary" as const;
    }

    if (hint === "Lifetime") {
        return "gold" as const;
    }

    return "gray" as const;
}

const MetricCard = ({card, className}: MetricCardProps) => {
    return (
        <Card className={cn("flex h-full flex-col justify-between gap-4", className)}>
            <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-mono-500 dark:text-mono-400">
                    {card.label}
                </p>
                {card.hint && (
                    <Badge variant={getHintVariant(card.hint)} className="px-3 py-1 text-xs">
                        {card.hint}
                    </Badge>
                )}
            </div>

            <p className="break-words text-2xl font-semibold tracking-tight text-mono-900 dark:text-mono-50">
                {formatMetricValue(card)}
            </p>
        </Card>
    );
};

export default MetricCard;
