import {useState, useEffet} from 'react';
import {msToMinutesAndSeconds, truncateText} from '../utils/formatting'


function TrackTableRow({item, removeTrack}) {
    // console.log("ROW ITEM", item)
    
    function handleButtonClick(id) {
        // console.log("Removing track", id)
        removeTrack(id)
    }
    function displayRow() {
        return(
            <tr className="track-table-row">
                <td className="track-table-cell">{item.name}</td>
                <td className="track-table-cell">{item.artists[0].name}</td>
                <td className="track-table-cell">{truncateText(item.album.name)}</td>
                <td className="track-table-cell">{msToMinutesAndSeconds(item.duration_ms)}</td>
                <td className="track-table-cell">
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