import { FaRobot } from "react-icons/fa";

const AIInsight = ({ insight, loading }) => {
    return (
        <section className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.28)]">

            <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <FaRobot className="text-xl" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        AI Energy Insight
                    </h2>
                    <p className="text-sm text-slate-400">
                        Generated from the latest office activity
                    </p>
                </div>

            </div>

            {loading ? (

                <div className="space-y-3">
                    <div className="h-3 w-40 rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 rounded-full bg-white/10" />
                </div>

            ) : (

                <p className="max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    {insight}
                </p>

            )}

        </section>
    );
};

export default AIInsight;