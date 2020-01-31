import React, { useContext } from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { RoomContext } from './Context'
import Loading from './Loading'

export default function RoomsContainer() {
    const { loading, sortedRooms, rooms } = useContext(RoomContext);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div>
                <RoomsFilter rooms={rooms} />
                <RoomsList rooms={sortedRooms} />
            </div>
        );
    }

}
