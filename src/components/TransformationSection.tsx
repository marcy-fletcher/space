import TransformationBadge from "./TransformationBadge.tsx";
import {Post} from "../types/post.ts";

type TransformationTrait = NonNullable<Post['transformations']>[number];

interface TransformationSectionProps {
    transformations: TransformationTrait[] | undefined;
}

const TransformationSection = ({transformations}: TransformationSectionProps) => {
    const hasTransformations = transformations && transformations.length > 0;

    if (!hasTransformations)
        return <></>

    return (

        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide font-sans transition-colors duration-300">
                    Transformations
                </h3>
            </div>

            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    {transformations?.map((transformation, index) => (
                        <TransformationBadge
                            key={index}
                            transformation={transformation}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransformationSection;