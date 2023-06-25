import {useState, useEffect} from 'react'

import PlaylistSettings from '../components/PlaylistSettings'

function PlaylistBanner({name, owner, numTracks, image, editDetails, unfollowPlaylist, toggleView}) {
    // image will return an empty array if there are no images
    const [edit, setEdit] = useState(false)
    function saveEdit() {
        console.log("Saving playlist details.")
        setEdit(false)
    }

    function handleUnfollow() {
        // if(confirm("Are you sure you wish to unfollow playlist?")) {
        //     console.log("Unfollowing playlist")
        // }
        // alert("Are you sure you want to unfllow playlist?")
        if(window.confirm("Are you sure you want to unfollow playlist?")) {
            console.log("Unfollowing")
            
            // unfollow the playlist and redirect back to home reflecting the changes
            unfollowPlaylist()
            setTimeout(() => toggleView('home'), 500)
            // toggleView('home')
        }
    }

    function displayImage() {
        if(image.length > 0) {
            return(
                <img className="playlist-banner-image" src={image[0].url} />
            )
        } else {
            return(
                <div className="playlist-banner-image-none">
                    <p>No image</p>
                </div>
                // <p>No image.</p>
            )
        }
    }

    function displayBanner() {
        return(
            <>
                {displayImage()}
                <div className="playlist-banner-subcontainer">
                    <p className="playlist-banner-title">{name}</p>
                    <p>{owner}</p>
                    <p>Total tracks {numTracks}</p>
                    <button className="playlist-banner-btn" onClick={() => setEdit(true)}>Edit playlist</button>
                    <button className="playlist-banner-btn" onClick={handleUnfollow} style={{backgroundColor: 'red'}}>Unfollow</button>
                </div>

            </>

        )
    }

    function confirmChange() {
        //confirm the change, reload and display playlist banner with new change applied
        // TODO
        console.log("Confirming changes")
        const updateTitle = document.getElementsByClassName('playlist-banner-edit')[0].value
        // can use description as well, maybe later
        const details = {
            'name': updateTitle
        }
        editDetails(details)
        setEdit(false)
    }

    function discardChange() {
        // return to the playlist banner
        // TODO
        console.log("Declinging changes")
        setEdit(false)
    }


    function displayPlaylistEdit() {
        // change playlist details from banner to editable input tags
        console.log("Change to edit banner")
        return(
            <>
                {displayImage()}
                <div className="playlist-banner-subcontainer">
                    <input className="playlist-banner-edit" defaultValue={name} ></input>
                    <div style={{display:'flex'}}>
                        <button className="playlist-banner-btn" onClick={confirmChange}>Confirm</button>
                        <button className="playlist-banner-btn" onClick={discardChange} style={{backgroundColor: 'red'}}>Discard</button>  
                    </div>
                    
                </div>

            </>

        )
    }

    useEffect(() => {

    }, [edit])

    return(
        <div className="playlist-banner">
            {/* <p className="playlist-banner-name">{name} by {owner} {numTracks} tracks</p>
            <button className="playlist-banner-btn" >Edit playlist details</button> */}
            {/* {displayBanner()} */}
            {edit ? displayPlaylistEdit() : displayBanner()}
        </div>
        
    )
}

export default PlaylistBanner