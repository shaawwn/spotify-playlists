import {useState, useEffect} from 'react';
import {msToMinutesAndSeconds, truncateText, truncateTextLong} from '../utils/formatting'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function TrackTableRow({item, removeTrack, play, pause, context, offset}) {
    // console.log("ROW ITEM", item)
    const [active, setActive] = useState(false)

    function handleButtonClick(e, id) {
        // console.log("Removing track", id)
        e.stopPropagation()
        removeTrack(id)
    }

    function handleClick(e) { // uri and context

        const id = document.getElementById(item.id)
        id.classList.add('track-table-row-active')
        play(null, context.uri, offset)
    }
    
    function displayRow() {
        return(
            <div className="track-table-row" id={item.id} onClick={(e) => handleClick(e)}>
                <div className="track-table-cell">
                    <div className="track-table-details">
                        <p className="track-table-details-song">{truncateTextLong(item.name)}</p>
                        <p className="track-table-details-artist">{item.artists[0].name}</p>
                    </div>
                </div>

                <div className="track-table-cell flex-end">
                    <p style={{'margin-top': 'auto', 'margin-bottom': 'auto'}}>{msToMinutesAndSeconds(item.duration_ms)}</p>
                    <FontAwesomeIcon className="track-table-delete" icon={faTrash} onClick={(e) => handleButtonClick(e, item.id)}/>
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