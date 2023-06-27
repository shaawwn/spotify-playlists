import {useState, useEffect} from 'react';
import TrackTableRow from '../components/TrackTableRow'


function TrackTable({items, removeTrack}) {

    // console.log("Table items", items[0])

    function displayTable() {

        return(
            <tbody className="track-table-body">
                {items.map((item) => 
                    <TrackTableRow 
                        key={item.track.id}
                        item={item.track} 
                        removeTrack={removeTrack}
                        />
                )}
            </tbody>
        )
    }

    function displayEmptyTable() {
        return(
            <tbody>
                <TrackTableRow item={null} />
            </tbody>
        )
    }

    return(
        <>
            <table className="track-table">
                <thead style={{textAlign: 'left'}}>
                    <tr>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                {items.length > 0 ? displayTable() : displayEmptyTable()}
            </table>    
        </>

    )
}

export default TrackTable