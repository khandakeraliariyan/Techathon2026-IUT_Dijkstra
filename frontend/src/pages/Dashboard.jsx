import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";

import OfficeLayout from "../components/office/OfficeLayout";
import PowerChart from "../components/charts/PowerChart";

import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import AIInsight from "../components/insights/AIInsight";

import useDashboard from "../hooks/useDashboard";
import useAnalytics from "../hooks/useAnalytics";
import useInsight from "../hooks/useInsight";

import { updateDeviceStatus } from "../services/device.service";
import { motion } from "framer-motion";
import { FaBolt, FaPlug, FaTriangleExclamation } from "react-icons/fa6";

const pageMotion = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
};

const sectionMotion = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut", delay },
});

const heroStats = [
    { key: "totalPower", label: "Total power", icon: FaBolt, accent: "text-cyan-300", bg: "bg-cyan-400/10", border: "border-cyan-400/15" },
    { key: "activeDevices", label: "Active devices", icon: FaPlug, accent: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/15" },
    { key: "alerts", label: "Alerts", icon: FaTriangleExclamation, accent: "text-rose-300", bg: "bg-rose-400/10", border: "border-rose-400/15" },
];

const Dashboard = ({
    isLightMode,
    onToggleTheme,
}) => {
    const {
        dashboard,
        loading,
        error,
        refresh,
    } = useDashboard();

    const analytics = useAnalytics();

    const {
        insight,
        loading: insightLoading,
    } = useInsight();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6 text-center text-rose-300">
                {error}
            </div>
        );
    }

    const activeDevices = dashboard.devices.filter(
        (device) => device.status
    ).length;

    const statValues = {
        totalPower: `${dashboard.totalPower}W`,
        activeDevices,
        alerts: dashboard.alerts.length,
    };

    const handleToggle = async (device) => {
        try {
            await updateDeviceStatus(
                device._id,
                !device.status
            );

            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar
                alerts={dashboard.alerts}
                rooms={dashboard.rooms}
                devices={dashboard.devices}
                onToggleDevice={handleToggle}
                isLightMode={isLightMode}
                onToggleTheme={onToggleTheme}
            />

            <motion.main
                className="mx-auto min-h-screen w-full max-w-[1600px] space-y-8 px-4 py-7 sm:px-6 lg:space-y-10 lg:px-10 lg:py-10"
                initial={pageMotion.initial}
                animate={pageMotion.animate}
                transition={pageMotion.transition}
            >
                <section className="glass-panel relative mt-2 overflow-hidden rounded-3xl px-6 py-8 sm:mt-3 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-[90px]" />

                    <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8">
                        <div className="space-y-3 text-center">
                            <h1 className="text-primary text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.95rem] lg:leading-[1.04]" style={{ fontFamily: "var(--font-display)" }}>
                                <span className="gradient-text">BigSave</span>
                            </h1>
                            <p className="surface-copy mx-auto text-base sm:text-lg">
                                Lets save some money!
                            </p>
                        </div>

                        <div className="w-full">
                            <OfficeLayout rooms={dashboard.rooms} />
                        </div>

                        <div className="grid w-full gap-4 sm:grid-cols-3">
                            {heroStats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.key}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                                        className="glass-card glass-card-hover metric-card rounded-2xl px-6 py-6 sm:px-7 sm:py-7"
                                    >
                                        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                                            <span className={`flex h-8 w-8 items-center justify-center rounded-xl border ${stat.border} ${stat.bg}`}>
                                                <Icon className={`text-sm ${stat.accent}`} />
                                            </span>
                                            <p className="text-muted text-xs uppercase tracking-[0.2em]">{stat.label}</p>
                                            <p className="text-primary text-2xl font-bold tracking-tight sm:text-[1.75rem]">{statValues[stat.key]}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <motion.div {...sectionMotion(0.05)}>
                    <PowerChart history={dashboard.powerHistory} />
                </motion.div>

                <motion.section {...sectionMotion(0.05)} className="space-y-6">
                    <div className="surface-header">
                        <div>
                            <p className="eyebrow">Performance</p>
                            <h2 className="section-title mt-1 text-xl sm:text-2xl">
                                Analytics
                            </h2>
                            <p className="surface-copy mt-1 text-sm">
                                Summary metrics from recent office activity
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <AnalyticsCard
                            title="Peak Power"
                            value={analytics?.peakPower || 0}
                            unit="W"
                            accent="cyan"
                        />

                        <AnalyticsCard
                            title="Average Power"
                            value={analytics?.averagePower || 0}
                            unit="W"
                            accent="brand"
                        />

                        <AnalyticsCard
                            title="Active Devices"
                            value={analytics?.deviceUsage || 0}
                            unit="%"
                            accent="emerald"
                        />

                        <AnalyticsCard
                            title="Inactive Devices"
                            value={analytics?.inactiveDevices || 0}
                            accent="rose"
                        />
                    </div>
                </motion.section>

                <motion.div {...sectionMotion(0.05)}>
                    <AIInsight
                        insight={insight}
                        loading={insightLoading}
                    />
                </motion.div>
            </motion.main>
        </>
    );
};

export default Dashboard;
