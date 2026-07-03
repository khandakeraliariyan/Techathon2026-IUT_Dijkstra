const AnalyticsCard = ({ title, value, unit }) => {

    return (

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

            <p className="text-slate-400">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-4">

                {value}

                <span className="text-lg ml-1">

                    {unit}

                </span>

            </h2>

        </div>

    );

};

export default AnalyticsCard;