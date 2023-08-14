import {useState, useEffect} from 'react';
import {msToMinutesAndSeconds, truncateText, truncateTextLong} from '../utils/formatting'


function TrackTableRow({item, removeTrack, play, pause, context, offset}) {
    // console.log("ROW ITEM", item)
    const [active, setActive] = useState(false)

    function handleButtonClick(e, id) {
        // console.log("Removing track", id)
        e.stopPropagation()
        removeTrack(id)
    }

    function handleClick(e) { // uri and context
        // e.stopPropagation()
        // console.log("item", context.uri, offset) 
        // console.log(e.target, item)
        // console.log("Clicking", uri, name)
        const id = document.getElementById(item.id)
        // id.classList.add('track-table-row-active')
        console.log(id)
        id.classList.add('track-table-row-active')
        play(null, context.uri, offset)
        // if(active === true) {
        //     setActive(false)
        // } else if(active === false) {
        //     setActive(true)
        // }
    }
    
    function displayRow() {
        return(
            <div className="track-table-row" id={item.id} onClick={(e) => handleClick(e)}>
                <div className="track-table-cell-name">{truncateTextLong(item.name)}</div>
                <div className="track-table-cell">{item.artists[0].name}</div>
                <div className="track-table-cell">{truncateText(item.album.name)}</div>
                <div className="track-table-cell">{msToMinutesAndSeconds(item.duration_ms)}</div>
                <div className="track-table-cell">
                    <button className="search-row-btn" onClick={(e) => handleButtonClick(e, item.id)}>Remove</button>
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

    useEffect(() => {

    }, [active])
    return(
        <>
            {item !== null ? displayRow() : displayEmptyRow()}
        </>
    )

}

export default TrackTableRow