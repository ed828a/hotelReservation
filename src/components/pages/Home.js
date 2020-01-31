import React from 'react'
import Hero from '../Hero'
import Banner from '../Banner'
import {Link} from 'react-router-dom'
import Services from '../Services'
import FeaturedRooms from '../FeaturedRooms'
import StyledHero from '../StyledHero'


function Home() {
    return (
        // <Hero hero="defaultHero" />
        <>
        <Hero>
            <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
                <Link to="/rooms" className="btn-primary">
                    our room
                </Link>
            </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        <StyledHero />
        </>
    )
}

export default Home
