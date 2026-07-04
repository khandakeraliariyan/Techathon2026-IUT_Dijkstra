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
        <div className="glass-card metric-card rounded-2xl px-6 py-6 sm:px-7 sm:py-7">
            <div className="flex flex-col items-center gap-5 text-center">
                <div>
                    <h2 className="text-primary text-lg font-bold tracking-tight">
                        {room.name}
                    </h2>
                    <p className="text-muted mt-1 text-sm">
                        Connected devices in this room
                    </p>
                </div>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                    {room.totalPower} W
                </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-5 place-items-center">
                {deviceSlots.map((device, index) => (
                    <div
                        key={device?._id || index}
                        className={index === 3 ? "col-start-2 flex flex-col items-center gap-2" : "flex flex-col items-center gap-2"}
                    >
                        <div className="border-subtle surface-strong flex h-20 w-20 items-center justify-center rounded-xl border">
                            {device ? (
                                <DeviceIcon device={device} />
                            ) : (
                                <div className="border-subtle h-6 w-6 rounded-full border border-dashed" />
                            )}
                        </div>

                        {device && (
                            <span className="text-secondary text-center text-sm">
                                {device.name}
                            </span>
                        )}

                        {!device && (
                            <span className="text-faint text-center text-sm">
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
