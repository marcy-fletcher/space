import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import type {RankedPostRow} from "../../types/dashboard.ts";

interface TopPostsChartProps {
    posts: RankedPostRow[];
}

function trimLabel(value: string): string {
    if (value.length <= 24) {
        return value;
    }

    return `${value.slice(0, 21)}...`;
}

const TopPostsChart = ({posts}: TopPostsChartProps) => {
    const chartData = [...posts]
        .slice(0, 5)
        .reverse()
        .map((post) => ({
            name: trimLabel(post.title),
            fullTitle: post.title,
            views: post.lifetimeViews
        }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{top: 8, right: 16, left: 24, bottom: 8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" horizontal={false}/>
                <XAxis type="number" allowDecimals={false} stroke="#71717a"/>
                <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    stroke="#71717a"
                />
                <Tooltip
                    formatter={(value) => [value, "Lifetime views"]}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.fullTitle ?? ""}
                    contentStyle={{
                        borderRadius: "0.75rem",
                        borderColor: "#d4d4d8"
                    }}
                />
                <Bar dataKey="views" name="Lifetime views" fill="#2563eb" radius={[0, 8, 8, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopPostsChart;
