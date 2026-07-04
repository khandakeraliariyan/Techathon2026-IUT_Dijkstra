import { FaLightbulb, FaFan } from "react-icons/fa";

const DeviceIcon = ({ device }) => {
    const isOn = device.status;

    if (device.type === "Light") {
        return (
            <FaLightbulb
                className={`
                    text-4xl
                    transition-all
                    duration-500
                    ${isOn
                        ? "text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.55)]"
                        : "text-slate-600"
                    }
                `}
            />
        );
    }

    return (
        <FaFan
            className={`
                text-4xl
                transition-all
                duration-500

                ${isOn
                    ? "text-cyan-300 animate-[spin_1.8s_linear_infinite] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                    : "text-slate-600"
                }
            `}
            />
    );
};

export default DeviceIcon;