import AlertCard from "./AlertCard";
import { motion } from "framer-motion";
import { FaTriangleExclamation } from "react-icons/fa6";

const listMotion = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const AlertPanel = ({ alerts }) => {
    return (
        <section className="glass-panel relative overflow-hidden rounded-2xl px-6 py-7 sm:px-8 sm:py-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/10 blur-[80px]" />

            <div className="relative mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                        <FaTriangleExclamation />
                    </span>
                    <div className="text-center sm:text-left">
                        <h2 className="section-title text-xl sm:text-2xl">
                            Active Alerts
                        </h2>
                        <p className="text-muted mt-0.5 text-sm">
                            Timestamped anomalies that need attention
                        </p>
                    </div>
                </div>

                <span className="chip border-rose-400/20 bg-rose-400/10 text-rose-200">
                    {alerts.length} open
                </span>
            </div>

            <motion.div
                variants={listMotion}
                initial="hidden"
                animate="show"
                className="relative space-y-5"
            >
                {alerts.length === 0 ? (
                    <div className="border-subtle surface-empty text-muted rounded-xl border border-dashed px-7 py-9 text-center text-sm">
                        All clear — no active alerts right now.
                    </div>
                ) : (
                    alerts.map((alert) => (
                        <AlertCard
                            key={alert._id}
                            alert={alert}
                        />
                    ))
                )}
            </motion.div>
        </section>
    );
};

export default AlertPanel;
