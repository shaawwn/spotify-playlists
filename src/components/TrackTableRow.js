import {useState, useEffet} from 'react';
import {msToMinutesAndSeconds} from '../utils/formatting'


function TrackTableRow({item, removeTrack}) {
    // console.log("ROW ITEM", item)
    
    function handleButtonClick(id) {
        // console.log("Removing track", id)
        removeTrack(id)
    }
    function displayRow() {
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.album.name}</td>
                <td>{msToMinutesAndSeconds(item.duration_ms)}</td>
                <td>
                    <button className="search-row-btn" onClick={() => handleButtonClick(item.id)}>Remove</button>
                </td>
            </tr>
        )
    }

    function displayEmptyRow() {
        return(
            <tr>
                <td>You have no tracks!</td>
            </tr>
        )
    }

    return(
        <>
            {item !== null ? displayRow() : displayEmptyRow()}
        </>
    )

}

export default TrackTableRow