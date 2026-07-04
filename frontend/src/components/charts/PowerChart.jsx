import {

    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts";

const PowerChart = ({ history }) => {

    const data =
        [...history]
            .reverse()
            .map(item => ({

                time:
                    new Date(item.createdAt)
                        .toLocaleTimeString(),

                power:
                    item.totalPower

            }));

    const tickStyle = {
        fill: "#94a3b8",
        fontSize: 12,
    };

    const tooltipStyle = {
        backgroundColor: "rgba(15, 23, 42, 0.98)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 14,
        color: "#e2e8f0",
        boxShadow: "0 20px 40px rgba(2, 6, 23, 0.45)",
    };

    return (

                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm sm:p-7">

                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                                        Live Power Usage
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Recent office-wide energy trend
                                    </p>
                                </div>
                                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                    Live feed
                                </span>
                            </div>

            <ResponsiveContainer width="100%" height={320}>

                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>

                    <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" strokeDasharray="4 12" vertical={false} />

                    <XAxis
                        dataKey="time"
                        tick={tickStyle}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={24}
                    />

                    <YAxis
                        tick={tickStyle}
                        axisLine={false}
                        tickLine={false}
                        width={44}
                    />

                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#cbd5e1" }} />

                    <Line

                        type="monotone"

                        dataKey="power"

                        stroke="url(#powerGradient)"

                        strokeWidth={3}

                        dot={false}

                        activeDot={{ r: 5 }}

                    />

                </LineChart>

            </ResponsiveContainer>

                            <svg width="0" height="0">
                                <defs>
                                    <linearGradient id="powerGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop offset="100%" stopColor="#22c55e" />
                                    </linearGradient>
                                </defs>
                            </svg>

        </div>

    );

};

export default PowerChart;