import {useState, useEffect} from 'react';
import TrackTableRow from '../components/TrackTableRow'


function TrackTable({items, removeTrack}) {

    // console.log("Table items", items[0])

    function displayTable() {

        return(
            <div className="track-table-body">
                {items.map((item) => 
                    <TrackTableRow 
                        key={item.track.id}
                        item={item.track} 
                        removeTrack={removeTrack}
                        />
                )}
            </div>
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
            <div className="track-table">
                {/* <div style={{textAlign: 'left'}}> */}
                    <div className="track-table-head">
                        <div className="track-table-cell-name">
                            <p>Name</p>
                        </div>
                        <div className="track-table-cell">
                            <p>Artist</p>
                        </div>
                        <div className="track-table-cell">
                            <p>Album</p>
                        </div>
                        <div className="track-table-cell">
                            <p>Duration</p>
                        </div>
                        <div className="track-table-cell">
                            <p>Update</p>
                        </div>
                    </div>
                {/* </div> */}
                {items.length > 0 ? displayTable() : displayEmptyTable()}
            </div>    
        </>

    )
}

export default TrackTable