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
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
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

            <main className="min-h-screen bg-slate-950 p-8 space-y-8">

                {/* Header */}

                <section>

                    <h1 className="text-4xl font-bold">
                        Smart Office Dashboard
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Real-Time Energy Monitoring System
                    </p>

                </section>

                {/* KPI Cards */}

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <KpiCard
                        title="Total Power"
                        value={dashboard.totalPower}
                        unit="W"
                        color="text-green-400"
                    />

                    <KpiCard
                        title="Active Devices"
                        value={activeDevices}
                        color="text-blue-400"
                    />

                    <KpiCard
                        title="Rooms"
                        value={dashboard.rooms.length}
                        color="text-purple-400"
                    />

                    <KpiCard
                        title="Active Alerts"
                        value={dashboard.alerts.length}
                        color="text-red-400"
                    />

                </section>

                {/* Office Layout + Alerts */}

                <section className="grid xl:grid-cols-3 gap-6">

                    <div className="xl:col-span-2">

                        <OfficeLayout
                            rooms={dashboard.rooms}
                        />

                    </div>

                    <AlertPanel
                        alerts={dashboard.alerts}
                    />

                </section>

                {/* Power Chart */}

                <PowerChart
                    history={dashboard.powerHistory}
                />

                {/* Device Grid */}

                <DeviceGrid
                    devices={dashboard.devices}
                    onToggle={handleToggle}
                />

                {/* Analytics */}

                <section>

                    <h2 className="text-2xl font-bold mb-6">
                        Analytics
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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

                {/* AI Insight */}

                <AIInsight
                    insight={insight}
                    loading={insightLoading}
                />

            </main>
        </>
    );
};

export default Dashboard;