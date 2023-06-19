import {useState, useEffet} from 'react';
import {msToMinutesAndSeconds} from '../utils/formatting'
function TrackTableRow({item}) {
    // console.log("ROW ITEM", item)

    function displayRow() {
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.album.name}</td>
                <td>{msToMinutesAndSeconds(item.duration_ms)}</td>
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