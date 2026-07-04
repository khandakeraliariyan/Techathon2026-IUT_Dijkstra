import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const AIInsight = ({ insight, loading }) => {
    return (
        <section className="glass-panel relative overflow-hidden rounded-2xl border-brand-400/15 px-6 py-7 sm:px-9 sm:py-9">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-brand-500/15 blur-[90px]" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-[80px]" />

            <div className="relative flex items-center gap-4">
                <motion.div
                    animate={{ boxShadow: ["0 0 0px rgba(129,140,248,0.4)", "0 0 26px rgba(129,140,248,0.55)", "0 0 0px rgba(129,140,248,0.4)"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white"
                >
                    <FaRobot className="text-xl" />
                </motion.div>

                <div>
                    <h2 className="section-title text-xl sm:text-2xl">
                        AI Energy Insight
                    </h2>
                    <p className="text-muted text-sm">
                        Generated from the latest office activity
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="relative mt-6 space-y-3">
                    <div className="surface-soft h-3 w-40 animate-pulse rounded-full" />
                    <div className="surface-soft h-3 w-5/6 animate-pulse rounded-full" />
                    <div className="surface-soft h-3 w-2/3 animate-pulse rounded-full" />
                </div>
            ) : (
                <motion.p
                    key={insight}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                className="text-secondary relative mt-7 max-w-4xl text-base leading-8 sm:text-lg"
                >
                    {insight}
                </motion.p>
            )}
        </section>
    );
};

export default AIInsight;
