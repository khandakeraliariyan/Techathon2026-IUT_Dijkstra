import { FaBolt } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { FaChevronDown, FaMoon, FaPlug, FaSun, FaTriangleExclamation } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import DeviceGrid from "../devices/DeviceGrid";

const typeLabels = {
    AFTER_HOURS: "After Hours",
    ROOM_ACTIVE: "Room Activity",
    HIGH_POWER: "High Power",
};

const Navbar = ({
    alerts = [],
    rooms = [],
    devices = [],
    onToggleDevice,
    isLightMode,
    onToggleTheme,
}) => {
    const [alertsOpen, setAlertsOpen] = useState(false);
    const [devicesOpen, setDevicesOpen] = useState(false);

    const activeDevices = devices.filter((device) => device.status).length;

    return (
        <nav className="nav-surface sticky top-0 z-40 w-full border-b backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ rotate: -8, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14 }}
                        className="border-subtle relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br from-brand-500 to-cyan-400 shadow-[0_0_28px_rgba(99,102,241,0.45)] sm:h-14 sm:w-14"
                    >
                        <FaBolt className="text-sm text-white drop-shadow sm:text-base" />
                    </motion.div>

                    <div className="hidden sm:block">
                        <p className="gradient-text pb-1 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                            BigSave
                        </p>
                    </div>
                </div>

                <div className="relative flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="border-subtle surface-soft text-secondary flex h-10 w-10 items-center justify-center rounded-full border transition hover:border-brand-400/40 hover:text-brand-300"
                        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
                        title={isLightMode ? "Dark mode" : "Light mode"}
                    >
                        {isLightMode ? <FaMoon /> : <FaSun />}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setDevicesOpen((open) => !open);
                            setAlertsOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-400/15 sm:text-sm"
                        aria-expanded={devicesOpen}
                        aria-haspopup="true"
                    >
                        <FaPlug className="text-cyan-300" />
                        <span>Devices</span>
                        <span className="rounded-full bg-cyan-300/15 px-2 py-0.5 font-mono text-[11px] text-cyan-50">
                            {activeDevices}/{devices.length}
                        </span>
                        <FaChevronDown className={`text-[10px] transition ${devicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setAlertsOpen((open) => !open);
                            setDevicesOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:border-rose-300/45 hover:bg-rose-400/15 sm:text-sm"
                        aria-expanded={alertsOpen}
                        aria-haspopup="true"
                    >
                        <FaTriangleExclamation className="text-rose-300" />
                        <span>Active Alerts</span>
                        <span className="rounded-full bg-rose-300/15 px-2 py-0.5 font-mono text-[11px] text-rose-100">
                            {alerts.length}
                        </span>
                        <FaChevronDown className={`text-[10px] transition ${alertsOpen ? "rotate-180" : ""}`} />
                    </button>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300 sm:text-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <MdCircle className="relative inline-flex h-2 w-2 rounded-full text-emerald-400" />
                        </span>
                        <span className="font-semibold">Live</span>
                    </div>

                    {devicesOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="glass-panel absolute right-0 top-full mt-3 w-[min(calc(100vw-2rem),72rem)] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border-cyan-400/20 px-4 py-4 sm:px-5 sm:py-5"
                        >
                            <DeviceGrid
                                rooms={rooms}
                                devices={devices}
                                onToggle={onToggleDevice}
                            />
                        </motion.div>
                    )}

                    {alertsOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="glass-panel absolute right-0 top-full mt-3 w-[min(calc(100vw-2rem),30rem)] overflow-hidden rounded-2xl border-rose-400/20"
                        >
                            <div className="border-subtle flex items-center justify-between gap-4 border-b px-5 py-4">
                                <div>
                                    <h2 className="section-title text-base">
                                        Active Alerts
                                    </h2>
                                    <p className="text-muted mt-0.5 text-xs">
                                        Timestamped anomalies that need attention
                                    </p>
                                </div>
                                <span className="chip border-rose-400/20 bg-rose-400/10 text-rose-200">
                                    {alerts.length} open
                                </span>
                            </div>

                            <div className="max-h-[28rem] space-y-3 overflow-y-auto px-4 py-4">
                                {alerts.length === 0 ? (
                                    <div className="border-subtle surface-empty text-muted rounded-xl border border-dashed px-5 py-6 text-center text-sm">
                                        All clear. No active alerts right now.
                                    </div>
                                ) : (
                                    alerts.map((alert) => (
                                        <article
                                            key={alert._id}
                                            className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-400/15 text-rose-300">
                                                    <FaTriangleExclamation />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="text-primary text-sm font-semibold">
                                                            {alert.title}
                                                        </h3>
                                                        <span className="border-subtle surface-soft text-secondary rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
                                                            {typeLabels[alert.type] || alert.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-secondary mt-2 text-sm leading-6">
                                                        {alert.message}
                                                    </p>
                                                    <div className="text-muted mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                                                        <span>{alert.room?.name || "Office"}</span>
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
                                        </article>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
