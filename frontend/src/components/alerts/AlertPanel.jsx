import AlertCard from "./AlertCard";

const AlertPanel = ({ alerts }) => {

    return (

        <section>

            <h2 className="text-2xl font-bold mb-6">

                Active Alerts

            </h2>

            <div className="space-y-4">

                {alerts.length === 0 ? (

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">

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