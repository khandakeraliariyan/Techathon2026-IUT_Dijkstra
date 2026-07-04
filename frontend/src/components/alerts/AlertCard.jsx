import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const colors = {
    HIGH: "border-rose-400/30 bg-rose-500/10 text-rose-200",
    MEDIUM: "border-amber-400/30 bg-amber-500/10 text-amber-100",
    LOW: "border-sky-400/30 bg-sky-500/10 text-sky-100",
};

const iconColors = {
    HIGH: "border-rose-400/30 bg-rose-400/15 text-rose-300",
    MEDIUM: "border-amber-400/30 bg-amber-400/15 text-amber-300",
    LOW: "border-sky-400/30 bg-sky-400/15 text-sky-300",
};

const typeLabels = {
    AFTER_HOURS: "After Hours",
    ROOM_ACTIVE: "Room Activity",
    HIGH_POWER: "High Power",
};

const cardMotion = {
    hidden: { opacity: 0, x: 12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const AlertCard = ({ alert }) => {
    return (
        <motion.article
            variants={cardMotion}
            className={`rounded-xl border px-5 py-5 shadow-[0_16px_35px_rgba(2,6,23,0.28)] backdrop-blur-sm sm:px-6 sm:py-6 ${colors[alert.severity] || colors.LOW}`}
        >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconColors[alert.severity] || iconColors.LOW}`}>
                    <FaExclamationTriangle className="text-lg" />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <h3 className="text-primary text-base font-semibold tracking-tight">
                            {alert.title}
                        </h3>
                        <span className="border-subtle surface-soft text-secondary rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                            {typeLabels[alert.type] || alert.type}
                        </span>
                    </div>

                    <p className="text-secondary text-sm leading-6">
                        {alert.message}
                    </p>

                    <div className="text-muted flex flex-wrap items-center justify-center gap-2 text-xs sm:justify-between">
                        <span>
                            {alert.room?.name || "Office"}
                        </span>
                        <span className="font-mono">
                            {new Date(alert.createdAt).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default AlertCard;
