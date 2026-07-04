const PowerMeter = ({ rooms, roomPower = {}, totalPower = 0, lastUpdated }) => {
    const roomEntries = rooms.map((room) => ({
        name: room.name,
        value: room.totalPower ?? roomPower[room.name] ?? 0,
    }));

    const maxValue = Math.max(totalPower, ...roomEntries.map((entry) => entry.value), 1);
    const fanCount = rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Fan").length, 0);
    const lightCount = rooms.reduce((sum, room) => sum + room.devices.filter((device) => device.type === "Light").length, 0);

    return (
        <section className="rounded-[2rem] border border-cyan-400/15 bg-slate-950/70 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.35)] backdrop-blur-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
                        Live Power Meter
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
                        {totalPower}W
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Total office draw across all connected devices
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-right">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200/80">
                        Status
                    </p>
                    <p className="text-sm font-semibold text-emerald-300">
                        Live
                    </p>
                </div>
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-white/8 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
                    <span>Room split</span>
                    <span>{lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Auto refresh"}</span>
                </div>

                <div className="mt-4 space-y-4">
                    {roomEntries.map((room) => {
                        const width = Math.max((room.value / maxValue) * 100, room.value > 0 ? 16 : 8);

                        return (
                            <div key={room.name} className="space-y-2">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="font-medium text-slate-200">{room.name}</span>
                                    <span className="text-slate-400">{room.value}W</span>
                                </div>
                                <div className="h-3 rounded-full bg-white/5">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-300 shadow-[0_0_18px_rgba(56,189,248,0.28)] transition-all duration-500"
                                        style={{ width: `${width}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Rooms</p>
                    <p className="mt-2 text-lg font-semibold text-slate-50">{rooms.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Fans</p>
                    <p className="mt-2 text-lg font-semibold text-slate-50">{fanCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Lights</p>
                    <p className="mt-2 text-lg font-semibold text-slate-50">{lightCount}</p>
                </div>
            </div>
        </section>
    );
};

export default PowerMeter;
