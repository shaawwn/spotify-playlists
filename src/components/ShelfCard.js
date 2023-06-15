import {useState, useEffect} from 'react';
import {truncateText} from '../utils/formatting';
function ShelfCard({playlist}) {

    function displayCard() {
        return(
            <div className="shelf-card">
            <img src={playlist.images[0].url} className="grid-card-image"/>
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