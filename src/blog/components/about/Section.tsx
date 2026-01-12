import Card from "../../../layout/Card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {cn} from "../../../utils/cn.ts";

type Variant = "red" | "green" | "yellow";

interface SectionProps {
    title: string;
    icon: IconDefinition;
    variant: Variant;
    children?: React.ReactNode;
    className?: string;
}

function getColor(variant: Variant) {
    switch (variant) {
        case "red":
            return "bg-red-500";
        case "green":
            return "bg-green-500";
        case "yellow":
            return "bg-yellow-500";
    }
}

const Section = ({title, icon, variant, children, className}: SectionProps) => {
    return (
        <Card className={className}>
            <div className="flex items-center gap-3 mb-4 font-serif text-2xl font-bold">
                <div className={cn("min-w-8 w-8 h-8 rounded flex items-center justify-center", getColor(variant))}>
                    <FontAwesomeIcon icon={icon} className="text-white text-xs"/>
                </div>
                <h3 className="truncate">
                    {title}
                </h3>
            </div>

            <div className="space-y-3">
                {children}
            </div>
        </Card>
    );
};

export default Section;