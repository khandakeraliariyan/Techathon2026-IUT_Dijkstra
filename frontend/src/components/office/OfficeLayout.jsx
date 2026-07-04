import DeviceIcon from "./DeviceIcon";
import { FaFan, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const roomAccents = [
    { ring: "border-brand-400/25", glow: "bg-brand-500/15", bar: "from-brand-400 to-brand-600", text: "text-brand-200" },
    { ring: "border-cyan-400/25", glow: "bg-cyan-400/15", bar: "from-cyan-400 to-cyan-600", text: "text-cyan-200" },
    { ring: "border-emerald-400/25", glow: "bg-emerald-400/15", bar: "from-emerald-400 to-emerald-600", text: "text-emerald-200" },
];

const slotOrder = [
    { type: "Light", slot: "top-left" },
    { type: "Fan", slot: "top-center" },
    { type: "Light", slot: "top-right" },
    { type: "Fan", slot: "center" },
    { type: "Light", slot: "bottom-center" },
];

const OfficeLayout = ({ rooms }) => {
    return (
        <section className="space-y-5">
            <div className="surface-header text-center xl:text-left">
                <div>
                    <p className="eyebrow">Floor plan</p>
                    <h2 className="section-title mt-1 text-xl sm:text-2xl">
                        Office Layout
                    </h2>
                    <p className="surface-copy mt-1 text-sm">
                        Top-view map of the office with live room states
                    </p>
                </div>
                <span className="chip">
                    {rooms.length} rooms mapped
                </span>
            </div>

            <div
                className="glass-panel app-grid relative overflow-hidden rounded-3xl px-5 py-6 sm:px-7 sm:py-8"
            >
                <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[100px]" />

                <div className="relative space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {rooms.map((room, index) => {
                                const lights = room.devices.filter((device) => device.type === "Light");
                                const fans = room.devices.filter((device) => device.type === "Fan");
                                const fanSlots = [...fans];
                                const lightSlots = [...lights];
                                const fanCount = fans.length;
                                const lightCount = lights.length;
                                const accent = roomAccents[index % roomAccents.length];

                                return (
                                    <motion.article
                                        key={room._id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.45, delay: index * 0.08 }}
                                        className={`glass-card glass-card-hover relative min-h-[380px] overflow-hidden rounded-2xl border ${accent.ring}`}
                                    >
                                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`} />
                                        <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${accent.glow}`} />

                                        <div className="relative z-10 flex h-full flex-col px-6 pb-6 pt-8 sm:px-7 sm:pb-7 sm:pt-9">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0 space-y-2">
                                                    <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${accent.text}`}>
                                                        Room {index + 1}
                                                    </p>
                                                    <h3 className="text-primary text-lg font-bold tracking-tight sm:text-[1.15rem]">
                                                        {room.name}
                                                    </h3>
                                                    <p className="text-muted max-w-[16rem] text-sm leading-6">
                                                        {room.description}
                                                    </p>
                                                </div>

                                                <div className="border-subtle surface-soft self-start rounded-xl border px-4 py-3 text-center backdrop-blur-sm sm:self-auto sm:text-right">
                                                    <p className="text-faint text-[10px] uppercase tracking-[0.22em]">
                                                        Live load
                                                    </p>
                                                    <p className="text-primary font-mono text-lg font-bold sm:text-xl">
                                                        {room.totalPower}W
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-7 grid flex-1 grid-cols-3 grid-rows-3 gap-4">
                                                {slotOrder.map((slot) => {
                                                    const device = slot.type === "Fan"
                                                        ? fanSlots.shift()
                                                        : lightSlots.shift();

                                                    const slotClasses = {
                                                        "top-left": "col-start-1 row-start-1 self-start justify-self-start",
                                                        "top-center": "col-start-2 row-start-1 self-start justify-self-center",
                                                        "top-right": "col-start-3 row-start-1 self-start justify-self-end",
                                                        center: "col-start-2 row-start-2 self-center justify-self-center",
                                                        "bottom-center": "col-start-2 row-start-3 self-end justify-self-center",
                                                    };

                                                    return (
                                                        <div
                                                            key={`${room._id}-${slot.slot}`}
                                                            className={`flex h-full w-full flex-col items-center justify-center gap-2 ${slotClasses[slot.slot]}`}
                                                        >
                                                            <div className={`flex h-16 w-16 items-center justify-center rounded-xl border transition-shadow duration-300 ${device?.status ? "border-subtle surface-soft shadow-[0_0_24px_rgba(56,189,248,0.16)]" : "border-muted surface-strong"}`}>
                                                                {device ? (
                                                                    <div className={device.status ? "scale-100" : "scale-90 opacity-50"}>
                                                                        <DeviceIcon device={device} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="border-subtle h-7 w-7 rounded-full border border-dashed" />
                                                                )}
                                                            </div>

                                                            {device && (
                                                                    <span className="border-subtle surface-strong text-secondary rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-sm">
                                                                    {device.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="text-muted mt-6 grid grid-cols-2 gap-4 text-xs">
                                                <div className="border-muted surface-muted rounded-xl border px-4 py-3">
                                                    <p className="text-faint flex items-center gap-1.5 uppercase tracking-[0.22em]">
                                                        <FaFan className="text-cyan-300/70" /> Fans
                                                    </p>
                                                    <p className="text-primary mt-1 text-sm font-semibold">
                                                        {fanCount} total
                                                    </p>
                                                </div>
                                                <div className="border-muted surface-muted rounded-xl border px-4 py-3">
                                                    <p className="text-faint flex items-center gap-1.5 uppercase tracking-[0.22em]">
                                                        <FaLightbulb className="text-amber-300/70" /> Lights
                                                    </p>
                                                    <p className="text-primary mt-1 text-sm font-semibold">
                                                        {lightCount} total
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OfficeLayout;
