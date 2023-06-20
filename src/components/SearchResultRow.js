import {truncateText} from '../utils/formatting' 

function SearchResultRow({track, innerRef, playlistID}) {

    function handleButtonClick(id) {
        console.log("Adding track to playlist", id, playlistID)
    }
    return(
        <tr className="search-row" ref={innerRef}>
            <td>
                <div className="search-row-details">
                    <p className="search-row-details-name">{truncateText(track.name)}</p>
                    <p className="search-row-details-artist">{track.artists[0].name}</p>
                </div>
                {/* {track.name} */}
            </td>
            <td>
                <div className="search-row-btn" onClick={() => handleButtonClick(track.id)}>Add</div>
                {/* <button className="search-row-btn">Add</button> */}
            </td>
        </tr>
    )
}
export default SearchResultRow