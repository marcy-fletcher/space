export const WarningLevelKeys = [
    "mild",
    "moderate",
    "graphic",
    "extreme"
] as const;

export type WarningLevel = typeof WarningLevelKeys[number];

export const sortByWarningLevel = <T extends { level: WarningLevel }>(items: T[]): T[] => {
    const levelOrder: WarningLevel[] = ["extreme", "graphic", "moderate", "mild"];
    return items.sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));
};

export interface Warning {
    id: number;
    postId: number;
    level: WarningLevel;
    text: string;
}