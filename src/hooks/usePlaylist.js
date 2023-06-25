import {useState, useEffect, useRef} from 'react';



function usePlaylist(accessToken, id) {

    const [playlist, setPlaylist] = useState()
    const [reload, setReload] = useState(false)

    function _reload() {
        // re-render playlist when playlist is modified to reflect changes in the DOM
        if(reload === false) {
            setReload(true)
        } else if(reload === true) {
            setReload(false)
        }
    }

    function editDetails(details) {
        // edit and update playlist details such as name and description
        console.log("Editing playlist details", details)

        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(details)
        }).then((response) => {
            if(!response.ok) {
                throw new Error()
            } else {
                console.log("Details updated")
                _reload()
            }
        }).catch((error) => {
            console.log("Error updated playlist details", error)
        })         
    }

    function addTrack(trackID) {
        // make a post reuest to add a track to the playlist
        if(id === undefined) {
            // console.log("No playlist selected!")
            alert("No playlist selected!")
            return false
        }
        const payload = {
            uris: [`spotify:track:${trackID}`]
        }
        fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            response.json()
        }).then((data) => {
            console.log("Adding track")
            _reload()
        }).catch((data) => {
            console.log("Error added track", data)
        })
        // console.log("Adding to playlist: ", id, "track: ", trackID)
    }

    function removeTrack(trackID) {
        // remove track from playlist
        if(id === undefined) {
            alert("No playlist selected!")
            return false
        }

        const payload = {
            tracks: [
                {uri:`spotify:track:${trackID}`}
            ]
        }
        fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            response.json()
        }).then((data) => {
            console.log("Removing track")
            _reload()
        }).catch((error) => {
            console.log("error removing track", error)
        })
        // console.log("Removing track from playlist: ", id, "track", trackID)
    }

    function updateTrack() {
        // change the tracks location within the playlist
    }

    function getPlaylist() {
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Playlist data", data)
            setPlaylist(data)
        })
    }
    
    useEffect(() => {
        if(accessToken && id) {
            getPlaylist()
        }
    }, [accessToken])

    useEffect(() => {
        if(accessToken && id) {
            getPlaylist()
        }
    }, [id])

    useEffect(() => {
        if(accessToken && id) {
            getPlaylist()
        }
    }, [reload])

    // will return undefined if no playlist
    return [playlist, addTrack, removeTrack, editDetails]
}

export default usePlaylist