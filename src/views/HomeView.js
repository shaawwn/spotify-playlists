import {useState, useEffect} from 'react';

import Grid from '../components/Grid'



function HomeView({playlists, scroll}) {

    return(
        <div className="home">
            {playlists? <Grid playlists={playlists} scroll={scroll}/> : <h1>No playlists!</h1>}
        </div>
    )
}

export default HomeView