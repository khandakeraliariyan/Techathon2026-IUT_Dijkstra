import RoomCard from "./RoomCard";

const OfficeLayout = ({ rooms }) => {

    return (

        <section>

            <h2 className="text-2xl font-bold mb-6">

                Office Layout

            </h2>

            <div className="grid lg:grid-cols-2 gap-6">

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