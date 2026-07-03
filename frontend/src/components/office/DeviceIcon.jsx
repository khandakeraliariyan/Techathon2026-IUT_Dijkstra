import { FaLightbulb, FaFan } from "react-icons/fa";

const DeviceIcon = ({ device }) => {

    const isOn = device.status;

    if (device.type === "Light") {

        return (

            <FaLightbulb
                className={`
                    text-5xl
                    transition-all
                    duration-500
                    ${isOn
                        ? "text-yellow-400 drop-shadow-[0_0_18px_#facc15]"
                        : "text-slate-600"
                    }
                `}
            />

        );

    }

    return (

        <FaFan
            className={`
                text-5xl
                transition-all
                duration-500

                ${isOn
                    ? "text-cyan-400 animate-[spin_1.8s_linear_infinite]"
                    : "text-slate-600"
                }
            `}
        />

    );

};

export default DeviceIcon;