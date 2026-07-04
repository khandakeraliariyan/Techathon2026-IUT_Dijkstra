import DeviceCard from "./DeviceCard";

const DeviceGrid = ({
    devices,
    onToggle,
}) => {

    return (

        <section className="space-y-5">

            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        Devices
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Monitor and control every connected device
                    </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {devices.length} devices
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {devices.map(device => (

                    <DeviceCard

                        key={device._id}

                        device={device}

                        onToggle={onToggle}

                    />

                ))}

            </div>

        </section>

    );

};

export default DeviceGrid;