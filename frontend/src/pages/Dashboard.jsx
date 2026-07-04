import Navbar from "../components/layout/Navbar";
import Loader from "../components/common/Loader";

import OfficeLayout from "../components/office/OfficeLayout";
import AlertPanel from "../components/alerts/AlertPanel";
import PowerChart from "../components/charts/PowerChart";
import DeviceGrid from "../components/devices/DeviceGrid";
import PowerMeter from "../components/dashboard/PowerMeter";

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

    const totalRooms = dashboard.rooms.length;
    const lastUpdated = dashboard.lastUpdated
        ? new Date(dashboard.lastUpdated)
        : null;

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
                className="mx-auto min-h-screen w-full max-w-[1760px] space-y-10 px-4 py-6 sm:px-6 lg:space-y-12 lg:px-8 lg:py-8"
                initial={pageMotion.initial}
                animate={pageMotion.animate}
                transition={pageMotion.transition}
            >
                <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.35)] backdrop-blur-sm sm:p-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-stretch">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <span className="inline-flex rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-300">
                                    Energy operations
                                </span>

                                <div>
                                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                                        Smart Office Dashboard
                                    </h1>

                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                        A live operations wall for the office: room layout, device state, power draw, and anomaly alerts in one place.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total power</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-50">{dashboard.totalPower}W</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active devices</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-50">{activeDevices}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Rooms</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-50">{totalRooms}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Alerts</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-50">{dashboard.alerts.length}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    {dashboard.devices.length} tracked devices
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    {dashboard.rooms.length} room zones
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Syncing live"}
                                </span>
                            </div>
                        </div>

                        <PowerMeter
                            rooms={dashboard.rooms}
                            roomPower={dashboard.roomPower}
                            totalPower={dashboard.totalPower}
                            lastUpdated={dashboard.lastUpdated}
                        />
                    </div>
                </section>

                <section className="grid gap-8 xl:grid-cols-12">
                    <div className="xl:col-span-8">
                        <OfficeLayout rooms={dashboard.rooms} />
                    </div>

                    <div className="xl:col-span-4">
                        <div className="xl:sticky xl:top-24">
                            <AlertPanel alerts={dashboard.alerts} />
                        </div>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm sm:p-6">
                    <DeviceGrid
                        rooms={dashboard.rooms}
                        devices={dashboard.devices}
                        onToggle={handleToggle}
                    />
                </section>

                <PowerChart history={dashboard.powerHistory} />

                <section className="space-y-6">
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

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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
