import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import type {PostSeriesPoint} from "../../types/dashboard.ts";

interface PostActivityChartProps {
    data: PostSeriesPoint[];
}

const tickFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
});

function formatDateLabel(value: string) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return tickFormatter.format(date);
}

const PostActivityChart = ({data}: PostActivityChartProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{top: 8, right: 8, left: -20, bottom: 8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8"/>
                <XAxis
                    dataKey="date"
                    tickFormatter={formatDateLabel}
                    stroke="#71717a"
                    minTickGap={24}
                />
                <YAxis allowDecimals={false} stroke="#71717a"/>
                <Tooltip
                    labelFormatter={(value) => formatDateLabel(String(value))}
                    contentStyle={{
                        borderRadius: "0.75rem",
                        borderColor: "#d4d4d8"
                    }}
                />
                <Legend />
                <Line type="monotone" dataKey="comments" name="Comments" stroke="#16a34a" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="debugLogs" name="Debug logs" stroke="#f97316" strokeWidth={2} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PostActivityChart;
