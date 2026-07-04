const AnalyticsCard = ({ title, value, unit }) => {

    return (

        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-5 shadow-[0_12px_30px_rgba(2,6,23,0.25)] backdrop-blur-sm">

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">

                {title}

            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50">

                {value}

                <span className="text-lg ml-1">

                    {unit}

                </span>

            </h2>

        </div>

    );

};

export default AnalyticsCard;