import { FaFan, FaLightbulb } from "react-icons/fa";
import DeviceIcon from "../office/DeviceIcon";

const DeviceGrid = ({
    rooms,
    devices,
    onToggle,
}) => {

    const roomGroups = rooms.map((room) => ({
        ...room,
        devices: devices.filter((device) => device.room?._id === room._id),
    }));

    return (

        <section className="space-y-5">

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        Live Device Status Panel
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Every device is organized by room and updates in real time
                    </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {devices.length} devices monitored
                </span>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
                {roomGroups.map((room, roomIndex) => {
                    const activeDevices = room.devices.filter((device) => device.status).length;
                    const roomPower = room.totalPower ?? room.devices.reduce((sum, device) => sum + (device.status ? device.powerRating : 0), 0);

                    return (
                        <article
                            key={room._id}
                            className="rounded-[1.9rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.3)] backdrop-blur-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Room {roomIndex + 1}
                                    </p>
                                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-50">
                                        {room.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {room.description}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-right">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                                        Load
                                    </p>
                                    <p className="text-lg font-semibold text-emerald-300">
                                        {roomPower}W
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-300">
                                <span>{activeDevices} / {room.devices.length} active</span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                                    Live
                                </span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {room.devices.map((device) => {
                                    const isFan = device.type === "Fan";

                                    return (
                                        <div
                                            key={device._id}
                                            className={`group rounded-2xl border p-3 transition duration-300 ${device.status
                                                ? "border-white/15 bg-white/7 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_36px_rgba(14,165,233,0.12)]"
                                                : "border-white/8 bg-slate-900/55"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex h-2.5 w-2.5 rounded-full ${device.status ? "bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.7)]" : "bg-slate-500"}`} />
                                                        <span className="text-sm font-semibold text-slate-50">
                                                            {device.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400">
                                                        {device.currentPower}W · {device.status ? "Running" : "Idle"}
                                                    </p>
                                                </div>

                                                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${device.status ? "border-cyan-400/20 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}>
                                                    {device.type === "Fan" ? (
                                                        <FaFan className={`text-lg ${device.status ? "animate-[spin_1.8s_linear_infinite] text-cyan-300" : "text-slate-500"}`} />
                                                    ) : (
                                                        <FaLightbulb className={`text-lg ${device.status ? "text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.45)]" : "text-slate-500"}`} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between gap-3">
                                                <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] ${device.status ? "bg-emerald-400/10 text-emerald-300" : "bg-slate-800/80 text-slate-400"}`}>
                                                    <span className={`h-2 w-2 rounded-full ${device.status ? "bg-emerald-400" : "bg-slate-500"}`} />
                                                    {device.status ? "ON" : "OFF"}
                                                </div>

                                                <button
                                                    onClick={() => onToggle(device)}
                                                    className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition duration-200 ${device.status
                                                        ? "bg-rose-500/90 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-500"
                                                        : "bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500"
                                                        }`}
                                                >
                                                    {device.status ? "Turn Off" : "Turn On"}
                                                </button>
                                            </div>

                                            <div className="mt-3 h-1.5 rounded-full bg-white/5">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${device.status ? (isFan ? "bg-cyan-300" : "bg-amber-300") : "bg-slate-700"}`}
                                                    style={{ width: device.status ? "100%" : "18%" }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </article>
                    );
                })}
            </div>

        </section>

    );

};

export default DeviceGrid;