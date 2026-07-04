import AlertCard from "./AlertCard";

const AlertPanel = ({ alerts }) => {

    return (

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm sm:p-6">

            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        Active Alerts
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Timestamped anomalies that need attention
                    </p>
                </div>

                <span className="rounded-full border border-rose-400/15 bg-rose-400/10 px-3 py-1 text-xs font-medium text-rose-200">
                    {alerts.length} open
                </span>
            </div>

            <div className="space-y-4">

                {alerts.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400">

                        No active alerts right now.

                    </div>

                ) : (

                    alerts.map((alert) => (

                        <AlertCard

                            key={alert._id}

                            alert={alert}

                        />

                    ))

                )}

            </div>

        </section>

    );

};

export default AlertPanel;