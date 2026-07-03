import DeviceIcon from "./DeviceIcon";

const RoomCard = ({ room }) => {

    return (

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

            <div className="flex justify-between">

                <h2 className="text-xl font-semibold">

                    {room.name}

                </h2>

                <span className="text-green-400">

                    {room.totalPower} W

                </span>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                {room.devices.map(device => (

                    <div
                        key={device._id}
                        className="flex flex-col items-center gap-2"
                    >

                        <DeviceIcon device={device} />

                        <span className="text-sm">

                            {device.name}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RoomCard;