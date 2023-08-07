import {useState, useEffet} from 'react';
import {msToMinutesAndSeconds, truncateText, truncateTextLong} from '../utils/formatting'


function TrackTableRow({item, removeTrack}) {
    // console.log("ROW ITEM", item)
    
    function handleButtonClick(id) {
        // console.log("Removing track", id)
        removeTrack(id)
    }
    function displayRow() {
        return(
            <div className="track-table-row">
                <div className="track-table-cell-name">{truncateTextLong(item.name)}</div>
                <div className="track-table-cell">{item.artists[0].name}</div>
                <div className="track-table-cell">{truncateText(item.album.name)}</div>
                <div className="track-table-cell">{msToMinutesAndSeconds(item.duration_ms)}</div>
                <div className="track-table-cell">
                    <button className="search-row-btn" onClick={() => handleButtonClick(item.id)}>Remove</button>
                </div>
            </div>
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