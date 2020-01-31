import React, { Component } from 'react';
// import items from '../data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            loading: true,
            type: 'all',
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            breakfast: false,
            pets: false
        };
    }

    // getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "hotelReservation",
                // order: 'sys.createAt'
                order: "-fields.price"  // - means reverse order
            });

            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            });

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        // getData
        this.getData();
        // let rooms = this.formatData(items);
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // let maxPrice = Math.max(...rooms.map(item => item.price));
        // let maxSize = Math.max(...rooms.map(item => item.size));
        // this.setState({
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms,
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice,
        //     maxSize
        // });
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id }; // images is overriden, id is new property
            return room;
        });

        return tempItems;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };

    handleChange = (event) => {
        const type = event.target.type;
        const target = event.target;
        const name = event.target.name;
        const value = type === 'checkbox' ? target.checked : event.target.value;
        console.log(`name: ${name} -- type: ${type} -- value: ${value}`);

        this.setState(
            {
                [name]: value   // [name] name is a variable, so use [] to wrap it, it's only in setState
            },
            this.filterRooms  // callback function
        );
    }

    filterRooms = () => {
        console.log("Hello from filterRooms()")
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
        capacity = parseInt(capacity);
        price = parseInt(price)

        let tempRooms = [...rooms];

        // filter by type
        if (type != 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

        // filter by extras
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === breakfast);
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === pets);
        }


        this.setState({
            sortedRooms: tempRooms
        })
    }
    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider >
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };