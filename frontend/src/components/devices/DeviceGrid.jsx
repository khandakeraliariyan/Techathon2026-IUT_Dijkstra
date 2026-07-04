import { FaFan, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const gridMotion = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const cardMotion = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ToggleSwitch = ({ checked, onChange }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 ${checked
            ? "border-emerald-400/40 bg-emerald-500/30"
            : "border-subtle surface-soft"
            }`}
    >
        <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={`absolute top-0.5 h-6 w-6 rounded-full shadow-md ${checked
                ? "left-[calc(100%-1.55rem)] bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                : "left-0.5 bg-slate-300"
                }`}
        />
    </button>
);

const DeviceGrid = ({
    rooms,
    devices,
    onToggle,
}) => {
    const roomGroups = rooms.map((room) => ({
        ...room,
        devices: devices.filter((device) => device.room?._id === room._id),
    }));

    return (
        <section className="space-y-5">
            <div className="surface-header">
                <div>
                    <p className="eyebrow">Control</p>
                    <h2 className="section-title mt-1 text-xl sm:text-2xl">
                        Live Device Status Panel
                    </h2>
                    <p className="surface-copy mt-1 text-sm">
                        Every device is organized by room and updates in real time
                    </p>
                </div>
                <span className="chip">
                    {devices.length} devices monitored
                </span>
            </div>

            <motion.div
                variants={gridMotion}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="grid gap-6 xl:grid-cols-3"
            >
                {roomGroups.map((room, roomIndex) => {
                    const activeDevices = room.devices.filter((device) => device.status).length;
                    const roomPower = room.totalPower ?? room.devices.reduce((sum, device) => sum + (device.status ? device.powerRating : 0), 0);

                    return (
                        <motion.article
                            key={room._id}
                            variants={cardMotion}
                            className="glass-card metric-card rounded-2xl px-6 py-6 sm:px-7 sm:py-7"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 pr-2">
                                    <p className="text-faint text-xs font-semibold uppercase tracking-[0.24em]">
                                        Room {roomIndex + 1}
                                    </p>
                                    <h3 className="text-primary mt-1 text-lg font-bold tracking-tight">
                                        {room.name}
                                    </h3>
                                    <p className="text-muted mt-1 text-sm">
                                        {room.description}
                                    </p>
                                </div>

                                <div className="shrink-0 rounded-xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-3 text-right">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                                        Load
                                    </p>
                                    <p className="font-mono text-lg font-semibold text-emerald-300">
                                        {roomPower}W
                                    </p>
                                </div>
                            </div>

                            <div className="border-muted surface-muted text-secondary mt-5 flex items-center justify-between rounded-xl border px-5 py-4 text-sm">
                                <span>{activeDevices} / {room.devices.length} active</span>
                                <span className="chip">
                                    Live
                                </span>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {room.devices.map((device) => {
                                    const isFan = device.type === "Fan";

                                    return (
                                        <div
                                            key={device._id}
                                            className={`group rounded-2xl border p-4 transition duration-300 sm:p-5 ${device.status
                                                ? "border-subtle surface-soft shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_36px_rgba(14,165,233,0.12)]"
                                                : "border-muted surface-strong"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex h-2.5 w-2.5 rounded-full ${device.status ? "bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.7)]" : "bg-slate-500"}`} />
                                                        <span className="text-primary text-sm font-semibold">
                                                            {device.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted text-xs">
                                                        {device.currentPower}W · {device.status ? "Running" : "Idle"}
                                                    </p>
                                                </div>

                                                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${device.status ? "border-cyan-400/20 bg-cyan-400/10" : "border-subtle surface-soft"}`}>
                                                    {isFan ? (
                                                        <FaFan className={`text-lg ${device.status ? "animate-[spin_1.8s_linear_infinite] text-cyan-300" : "text-slate-500"}`} />
                                                    ) : (
                                                        <FaLightbulb className={`text-lg ${device.status ? "text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.45)]" : "text-slate-500"}`} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 flex items-center justify-between gap-3">
                                                <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] ${device.status ? "bg-emerald-400/10 text-emerald-300" : "surface-soft text-muted"}`}>
                                                    {device.status ? "ON" : "OFF"}
                                                </div>

                                                <ToggleSwitch checked={device.status} onChange={() => onToggle(device)} />
                                            </div>

                                            <div className="surface-soft mt-3 h-1.5 overflow-hidden rounded-full">
                                                <motion.div
                                                    initial={false}
                                                    animate={{ width: device.status ? "100%" : "18%" }}
                                                    transition={{ duration: 0.4 }}
                                                    className={`h-full rounded-full ${device.status ? (isFan ? "bg-cyan-300" : "bg-amber-300") : "bg-slate-700"}`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.article>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default DeviceGrid;
