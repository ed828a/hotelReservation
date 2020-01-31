import React, { Component } from 'react';
import defaultBcg from '../../images/room-1.jpeg';
import { Link } from 'react-router-dom';
import { RoomContext, RoomConsumer } from '../Context';
import Hero from '../Hero';
import Banner from '../Banner';
import StyledHero from '../StyledHero';


export class SingleRoom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext;

    render() {
        console.log(this.props);
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return (
                <div className="error">
                    <h3>no such room could be found... </h3>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </div>
            )

        }

        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;

        const [mainImg, ...defaultImgs] = images; // mainImg takes the first image, defaultImgs takes the rest images.
        console.log(defaultImgs);

        return (
            <>
                <StyledHero img={images[0] || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className='btn-primary'>
                            back to rooms
                    </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {images.map((image, index) => {
                            if (index !== 0) {
                                return (<img key={index} src={image} alt={name} />);
                            } else { 
                                return null; 
                            }
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price: ${price}</h6>
                            <h6>size: {size} SQFT</h6>
                            <h6>max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`} </h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"} </h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return (
                                <li key={index} >- {item} </li>
                            );
                        })}
                    </ul>
                </section>
            </>
        )
    }
}

export default SingleRoom
