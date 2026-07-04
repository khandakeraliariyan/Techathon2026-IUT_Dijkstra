import AlertCard from "./AlertCard";

const AlertPanel = ({ alerts }) => {

    return (

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm">

            <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                    Active Alerts
                </h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {alerts.length} open
                </span>
            </div>

            <div className="space-y-4">

                {alerts.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">

                        No Active Alerts

                    </div>

                ) : (

                    alerts.map(alert => (

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