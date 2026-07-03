import { FaRobot } from "react-icons/fa";

const AIInsight = ({ insight, loading }) => {
    return (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 p-6">

            <div className="flex items-center gap-3 mb-5">

                <FaRobot className="text-3xl text-cyan-400" />

                <h2 className="text-2xl font-bold">
                    AI Energy Insight
                </h2>

            </div>

            {loading ? (

                <p className="text-slate-400">
                    Generating insight...
                </p>

            ) : (

                <p className="text-slate-300 leading-8">
                    {insight}
                </p>

            )}

        </section>
    );
};

export default AIInsight;