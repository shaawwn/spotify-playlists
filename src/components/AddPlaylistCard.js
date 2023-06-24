import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'


function AddPlaylistCard({toggleView, createPlaylist}) {
        
    function handleClick() {
        // so creating a playlist should CREATE a playlist automatically, and take you to the view of the playlist, with no tracks (since playlists start with none).
        // console.log("Creating playlist from its own compoennt ")

        createPlaylist()

    }


    return(
        <div className="grid-card" onClick={handleClick} >
            <FontAwesomeIcon icon={faPlus} />
        </div>
    )
}

export default AddPlaylistCard