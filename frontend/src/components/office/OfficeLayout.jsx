import DeviceIcon from "./DeviceIcon";
import { FaFan, FaLightbulb } from "react-icons/fa";

const roomThemes = [
    "from-amber-100 via-stone-100 to-amber-50",
    "from-slate-100 via-white to-slate-200",
    "from-orange-100 via-amber-50 to-amber-200",
];

const roomAccents = [
    "border-amber-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
    "border-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
    "border-orange-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
];

const legendItems = [
    {
        label: "Fan",
        icon: FaFan,
        color: "text-cyan-300",
    },
    {
        label: "Light",
        icon: FaLightbulb,
        color: "text-amber-300",
    },
    {
        label: "Door",
        icon: () => (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-500/60 bg-slate-500/15 text-[10px] text-slate-200">
                D
            </span>
        ),
        color: "text-slate-300",
    },
    {
        label: "Window",
        icon: () => (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 text-[10px] text-sky-200">
                W
            </span>
        ),
        color: "text-sky-200",
    },
];

const slotOrder = [
    { type: "Light", slot: "top-left" },
    { type: "Fan", slot: "top-center" },
    { type: "Light", slot: "top-right" },
    { type: "Fan", slot: "center" },
    { type: "Light", slot: "bottom-center" },
];

const OfficeLayout = ({ rooms }) => {

    return (

        <section className="space-y-5">

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        Office Layout
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Top-view map of the office with live room states
                    </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {rooms.length} rooms mapped
                </span>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#d7c2a2] p-4 shadow-[0_24px_70px_rgba(2,6,23,0.28)] sm:p-5">
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="space-y-4">
                        <div className="grid gap-4 lg:grid-cols-3">
                            {rooms.map((room, index) => {
                                const lights = room.devices.filter((device) => device.type === "Light");
                                const fans = room.devices.filter((device) => device.type === "Fan");
                                const fanSlots = [...fans];
                                const lightSlots = [...lights];
                                const fanCount = fans.length;
                                const lightCount = lights.length;
                                const themedRoom = roomThemes[index % roomThemes.length];
                                const roomAccent = roomAccents[index % roomAccents.length];

                                return (
                                    <article
                                        key={room._id}
                                        className={`relative min-h-[330px] overflow-hidden rounded-[1.8rem] border bg-gradient-to-br ${themedRoom} ${roomAccent}`}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-3 bg-white/35" />
                                        <div className="absolute inset-x-0 top-3 h-4 bg-gradient-to-r from-slate-700/55 via-slate-500/10 to-slate-700/55" />
                                        <div className="absolute left-1/2 top-3 h-10 w-24 -translate-x-1/2 rounded-b-2xl border-x border-b border-white/20 bg-white/40" />

                                        <div className="relative z-10 flex h-full flex-col p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                                                        Room {index + 1}
                                                    </p>
                                                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                                                        {room.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-600">
                                                        {room.description}
                                                    </p>
                                                </div>

                                                <div className="rounded-2xl border border-white/60 bg-white/60 px-3 py-2 text-right text-slate-900 shadow-sm backdrop-blur-sm">
                                                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                                                        Live load
                                                    </p>
                                                    <p className="text-xl font-semibold">
                                                        {room.totalPower}W
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 grid flex-1 grid-cols-3 grid-rows-3 gap-3">
                                                {slotOrder.map((slot) => {
                                                    const device = slot.type === "Fan"
                                                        ? fanSlots.shift()
                                                        : lightSlots.shift();

                                                    const slotClasses = {
                                                        "top-left": "col-start-1 row-start-1 self-start justify-self-start",
                                                        "top-center": "col-start-2 row-start-1 self-start justify-self-center",
                                                        "top-right": "col-start-3 row-start-1 self-start justify-self-end",
                                                        center: "col-start-2 row-start-2 self-center justify-self-center",
                                                        "bottom-center": "col-start-2 row-start-3 self-end justify-self-center",
                                                    };

                                                    return (
                                                        <div
                                                            key={`${room._id}-${slot.slot}`}
                                                            className={`flex h-full w-full flex-col items-center justify-center gap-2 ${slotClasses[slot.slot]}`}
                                                        >
                                                            <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-slate-900/10 bg-white/75 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
                                                                {device ? (
                                                                    <div className={device.status ? "scale-100" : "scale-95 opacity-55"}>
                                                                        <DeviceIcon device={device} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-7 w-7 rounded-full border border-dashed border-slate-400/50" />
                                                                )}
                                                            </div>

                                                            {device && (
                                                                <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[11px] font-medium text-white shadow-sm">
                                                                    {device.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-700">
                                                <div className="rounded-2xl border border-white/60 bg-white/50 px-3 py-2">
                                                    <p className="uppercase tracking-[0.22em] text-slate-500">
                                                        Fans
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                                        {fanCount} total
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-white/60 bg-white/50 px-3 py-2">
                                                    <p className="uppercase tracking-[0.22em] text-slate-500">
                                                        Lights
                                                    </p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                                        {lightCount} total
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="rounded-[1.5rem] border border-slate-900/15 bg-[#d2b99a]/80 p-4 shadow-inner shadow-slate-900/10">
                            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_1.1fr]">
                                <div className="rounded-[1.3rem] border border-slate-900/15 bg-[#c7ae8a]/80 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-700/80">
                                        Entry / Corridor
                                    </p>
                                    <p className="mt-2 text-sm text-slate-700">
                                        Central passage keeps the room blocks visually aligned to the reference layout.
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {rooms.map((room, index) => (
                                        <div
                                            key={`${room._id}-usage`}
                                            className="rounded-[1.25rem] border border-slate-900/10 bg-white/55 p-3 text-slate-900"
                                        >
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                                                {index === 0 ? "Waiting area" : "Employees"}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold">
                                                {room.name}
                                            </p>
                                            <p className="text-xs text-slate-600">
                                                {room.devices.length} devices · {room.totalPower}W
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-4 xl:sticky xl:top-24">
                        <div className="rounded-[1.6rem] border border-slate-900/10 bg-white/70 p-4 text-slate-900 shadow-[0_16px_35px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                            <h3 className="text-lg font-semibold tracking-tight">
                                Legend
                            </h3>
                            <div className="mt-4 space-y-3">
                                {legendItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/60 px-3 py-2"
                                        >
                                            <span className={item.color}>
                                                <Icon className="text-lg" />
                                            </span>
                                            <span className="text-sm font-medium text-slate-700">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-slate-900/10 bg-white/70 p-4 text-slate-900 shadow-[0_16px_35px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                            <h3 className="text-lg font-semibold tracking-tight">
                                Devices Summary
                            </h3>
                            <div className="mt-4 space-y-3 text-sm text-slate-700">
                                <div className="flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white/60 px-3 py-2">
                                    <span>Rooms</span>
                                    <strong>{rooms.length}</strong>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white/60 px-3 py-2">
                                    <span>Fans</span>
                                    <strong>{rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Fan").length, 0)}</strong>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white/60 px-3 py-2">
                                    <span>Lights</span>
                                    <strong>{rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Light").length, 0)}</strong>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

        </section>

    );

};

export default OfficeLayout;