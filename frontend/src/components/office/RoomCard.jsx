import DeviceIcon from "./DeviceIcon";

const RoomCard = ({ room }) => {

    const lights = room.devices.filter(device => device.type === "Light");
    const fans = room.devices.filter(device => device.type === "Fan");

    const deviceSlots = [
        lights[0],
        fans[0],
        lights[1],
        fans[1],
        lights[2],
    ];

    return (

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(2,6,23,0.22)] backdrop-blur-sm">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-slate-50">

                        {room.name}

                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Connected devices in this room
                    </p>
                </div>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">

                    {room.totalPower} W

                </span>

            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 place-items-center">

                {deviceSlots.map((device, index) => (

                    <div
                        key={device?._id || index}
                        className={index === 3 ? "col-start-2 flex flex-col items-center gap-2" : "flex flex-col items-center gap-2"}
                    >

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/30">
                            {device ? (
                                <DeviceIcon device={device} />
                            ) : (
                                <div className="h-6 w-6 rounded-full border border-dashed border-white/10" />
                            )}
                        </div>

                        {device && (
                            <span className="text-sm text-slate-300">

                                {device.name}
                            </span>
                        )}

                        {!device && (
                            <span className="text-sm text-slate-500">
                                Empty
                            </span>
                        )}

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RoomCard;