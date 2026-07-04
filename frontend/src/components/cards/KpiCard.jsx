const KpiCard = ({ title, value, unit, color }) => {

    return (

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(2,6,23,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/7 sm:p-6">

            <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    {title}
                </p>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.65)]" />
            </div>

            <h2 className={`text-4xl font-semibold tracking-tight sm:text-5xl ${color}`}>

                {value}

                <span className="text-xl ml-1">

                    {unit}

                </span>

            </h2>

        </div>

    );

};

export default KpiCard;