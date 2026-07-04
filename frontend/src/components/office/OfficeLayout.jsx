import RoomCard from "./RoomCard";

const OfficeLayout = ({ rooms }) => {

    return (

        <section className="space-y-5">

            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                        Office Layout
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Real-time room-level device overview
                    </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {rooms.length} rooms
                </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">

                {rooms.map(room => (

                    <RoomCard
                        key={room._id}
                        room={room}
                    />

                ))}

            </div>

        </section>

    );

};

export default OfficeLayout;