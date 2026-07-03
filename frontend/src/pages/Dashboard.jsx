import Navbar from "../components/layout/Navbar";
import KpiCard from "../components/cards/KpiCard";
import Loader from "../components/common/Loader";
import OfficeLayout from "../components/office/OfficeLayout";

import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {

    const { dashboard, loading, error } = useDashboard();

    if (loading) {

        return <Loader />;

    }

    if (error) {

        return (
            <div className="flex justify-center items-center h-screen bg-slate-950 text-red-500">
                {error}
            </div>
        );

    }

    const activeDevices = dashboard.devices.filter(device => device.status).length;

    return (

        <>

            <Navbar />

            <main className="p-8 space-y-8">

                <section>

                    <h2 className="text-3xl font-bold">
                        Dashboard
                    </h2>

                    <p className="text-slate-400">
                        Smart Office Energy Monitoring
                    </p>

                </section>

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

                    <OfficeLayout rooms={dashboard.rooms} />

                </section>

            </main>

        </>

    );

};

export default Dashboard;