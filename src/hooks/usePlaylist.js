import {useState, useEffect, useRef} from 'react';

function usePlaylist(accessToken, id) {


    const [playlist, setPlaylist] = useState([])

    function getPlaylist() {
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Playlist data", data)
        })
    }
    
    useEffect(() => {

    }, [])


    return [playlist]
}

export default usePlaylist