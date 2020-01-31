import React, { useContext } from 'react'
import Room from './Room'
import { RoomContext } from './Context'

export default function RoomsList({rooms}) {
    const { sortedRooms } = useContext(RoomContext);

    if (sortedRooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>unfortunately no rooms matched your search parameters</h3>
            </div>
        );
    } else {
        return (
            <section className="roomslist">
                <div className="roomslist-center">
                    {
                        sortedRooms.map((room) => {
                            return (
                                <Room key={room.id} room={room} />
                            );
                        })
                    }
                </div>
            </section>
        );
    }

}
