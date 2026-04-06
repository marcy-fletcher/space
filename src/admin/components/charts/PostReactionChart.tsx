import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
import type {ReactionTotal} from "../../types/dashboard.ts";

interface PostReactionChartProps {
    data: ReactionTotal[];
}

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#ea580c",
    "#7c3aed",
    "#db2777",
    "#0891b2",
    "#ca8a04",
    "#4f46e5"
];

const PostReactionChart = ({data}: PostReactionChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="total"
                    nameKey="reaction"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`${entry.reaction}-${entry.total}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => [value, "Lifetime total"]}
                    contentStyle={{
                        borderRadius: "0.75rem",
                        borderColor: "#d4d4d8"
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PostReactionChart;
