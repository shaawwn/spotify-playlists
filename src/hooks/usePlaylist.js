import {useState, useEffect, useRef} from 'react';

function usePlaylist(accessToken, id) {


    const [playlist, setPlaylist] = useState()

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

    // will return undefined if no playlist
    return [playlist]
}

export default usePlaylist