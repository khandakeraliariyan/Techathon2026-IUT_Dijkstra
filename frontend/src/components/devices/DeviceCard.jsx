import { FaFan, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const DeviceCard = ({ device, onToggle }) => {
    const Icon =
        device.type === "Fan"
            ? FaFan
            : FaLightbulb;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="glass-card metric-card rounded-2xl px-6 py-6 sm:px-7 sm:py-7"
        >
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${device.status ? "border-amber-400/20 bg-amber-400/10" : "border-subtle surface-soft"}`}>
                    <Icon
                        className={`text-xl transition ${device.status
                            ? "text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                            : "text-slate-500"
                            }`}
                    />
                </span>

                <div>
                    <h2 className="text-primary text-lg font-bold tracking-tight">
                        {device.name}
                    </h2>
                    <p className="text-muted mt-1 text-sm">
                        {device.room.name}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] ${device.status
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "surface-soft text-muted"
                    }`}>
                    {device.status
                        ? "ON"
                        : "OFF"}
                </span>

                <button
                    onClick={() =>
                        onToggle(device)
                    }
                    className={device.status ? "btn-danger" : "btn-primary"}
                >
                    {device.status
                        ? "Turn Off"
                        : "Turn On"}
                </button>
            </div>
            </div>
        </motion.div>
    );
};

export default DeviceCard;
