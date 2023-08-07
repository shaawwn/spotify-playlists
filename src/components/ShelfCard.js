import {useState, useEffect} from 'react';
import {truncateText} from '../utils/formatting';

function ShelfCard({playlist, toggleView}) {

    function handleClick() {
        // console.log("Clicking", playlist.id)
        // setPlaylistID(playlist.id)
        toggleView('playlist', playlist.id)
    }
    
    // function displayCard() {
    //     return(
    //         <div className="shelf-card" onClick={handleClick}>
                
    //             <img src={playlist.images[0].url} className="shelf-card-image"/>
    //             <p className="shelf-card-name">{truncateText(playlist.name)}</p>
    //         </div>
    //     )
    // }

    function displayCard() {
        // console.log("PLAYLISTS", playlist.images)
        return(
            <div className="grid-card" onClick={handleClick}>
                {playlist && playlist.images.length > 0 ? 
                    <img 
                        src={playlist.images[0].url} 
                        className="grid-card-image" 
                        // ref={innerRef}
                        alt={playlist.name}
                    /> 
                    :<p>No image</p>}
            {/* <img src={playlist.images[0].url} className="grid-card-image"/> */}
            <p className="grid-card-name">{truncateText(playlist.name)}</p>
        </div>
        )
    }
    return(
        <>
            {playlist !== null ? displayCard() : <h1>No item</h1>}
        </>
    )
}

export default ShelfCard