import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";

import KpiCard from "../components/cards/KpiCard";

import OfficeLayout from "../components/office/OfficeLayout";
import AlertPanel from "../components/alerts/AlertPanel";
import PowerChart from "../components/charts/PowerChart";
import DeviceGrid from "../components/devices/DeviceGrid";

import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import AIInsight from "../components/insights/AIInsight";

import useDashboard from "../hooks/useDashboard";
import useAnalytics from "../hooks/useAnalytics";
import useInsight from "../hooks/useInsight";

import { updateDeviceStatus } from "../services/device.service";
import { motion } from "framer-motion";

const pageMotion = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut" },
};

const Dashboard = () => {
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
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-red-300">
                {error}
            </div>
        );
    }

    const activeDevices = dashboard.devices.filter(
        (device) => device.status
    ).length;

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
            <Navbar />

            <motion.main
                className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
                initial={pageMotion.initial}
                animate={pageMotion.animate}
                transition={pageMotion.transition}
            >
                <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.35)] backdrop-blur-sm sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl space-y-4">
                            <span className="inline-flex rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300">
                                Energy operations
                            </span>

                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                                    Smart Office Dashboard
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                    Real-time energy monitoring, device control, and room-level visibility for the office.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3 lg:w-[24rem]">
                            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Power</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-50">{dashboard.totalPower}W</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active devices</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-50">{activeDevices}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Alerts</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-50">{dashboard.alerts.length}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                        title="Total Power"
                        value={dashboard.totalPower}
                        unit="W"
                        color="text-green-300"
                    />

                    <KpiCard
                        title="Active Devices"
                        value={activeDevices}
                        color="text-blue-300"
                    />

                    <KpiCard
                        title="Rooms"
                        value={dashboard.rooms.length}
                        color="text-violet-300"
                    />

                    <KpiCard
                        title="Active Alerts"
                        value={dashboard.alerts.length}
                        color="text-rose-300"
                    />
                </section>

                <section className="grid gap-6 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <OfficeLayout rooms={dashboard.rooms} />
                    </div>

                    <div className="xl:col-span-4">
                        <AlertPanel alerts={dashboard.alerts} />
                    </div>
                </section>

                <PowerChart history={dashboard.powerHistory} />

                <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm sm:p-6">
                    <DeviceGrid
                        devices={dashboard.devices}
                        onToggle={handleToggle}
                    />
                </section>

                <section className="space-y-5">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                                Analytics
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Summary metrics from recent office activity
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <AnalyticsCard
                            title="Peak Power"
                            value={analytics?.peakPower || 0}
                            unit="W"
                        />

                        <AnalyticsCard
                            title="Average Power"
                            value={analytics?.averagePower || 0}
                            unit="W"
                        />

                        <AnalyticsCard
                            title="Active Devices"
                            value={analytics?.deviceUsage || 0}
                            unit="%"
                        />

                        <AnalyticsCard
                            title="Inactive Devices"
                            value={analytics?.inactiveDevices || 0}
                        />
                    </div>
                </section>

                <AIInsight
                    insight={insight}
                    loading={insightLoading}
                />
            </motion.main>
        </>
    );
};

export default Dashboard;
