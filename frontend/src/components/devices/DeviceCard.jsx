import { FaFan, FaLightbulb } from "react-icons/fa";

const DeviceCard = ({ device, onToggle }) => {

    const Icon =
        device.type === "Fan"
            ? FaFan
            : FaLightbulb;

    return (

        <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_16px_40px_rgba(2,6,23,0.22)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/7">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-lg font-semibold tracking-tight text-slate-50">

                        {device.name}

                    </h2>

                    <p className="mt-1 text-sm text-slate-400">

                        {device.room.name}

                    </p>

                </div>

                <Icon
                    className={`text-3xl transition ${device.status
                        ? "text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                        : "text-slate-500"
                        }`}
                />

            </div>

            <div className="mt-6 flex items-center justify-between gap-3">

                <span className={`rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] ${device.status
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-slate-800/80 text-slate-400"
                    }`}>

                    {device.status
                        ? "ON"
                        : "OFF"}

                </span>

                <button

                    onClick={() =>
                        onToggle(device)
                    }

                    className={`rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition duration-200 hover:scale-[1.02] ${device.status
                        ? "bg-rose-500/90 text-white shadow-rose-500/20 hover:bg-rose-500"
                        : "bg-emerald-500/90 text-white shadow-emerald-500/20 hover:bg-emerald-500"
                        }`}
                >

                    {device.status
                        ? "Turn Off"
                        : "Turn On"}

                </button>

            </div>

        </div>

    );

};

export default DeviceCard;