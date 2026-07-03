import {
    FaExclamationTriangle
} from "react-icons/fa";

const colors = {
    HIGH: "border-red-500 bg-red-500/10",
    MEDIUM: "border-yellow-500 bg-yellow-500/10",
    LOW: "border-blue-500 bg-blue-500/10",
};

const AlertCard = ({ alert }) => {

    return (

        <div
            className={`rounded-xl border p-4 ${colors[alert.severity]}`}
        >

            <div className="flex items-center gap-3">

                <FaExclamationTriangle
                    className="text-red-400 text-xl"
                />

                <div>

                    <h3 className="font-semibold">

                        {alert.title}

                    </h3>

                    <p className="text-sm text-slate-300">

                        {alert.message}

                    </p>

                </div>

            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">

                <span>

                    {alert.room?.name}

                </span>

                <span>

                    {new Date(alert.createdAt)
                        .toLocaleTimeString()}

                </span>

            </div>

        </div>

    );

};

export default AlertCard;