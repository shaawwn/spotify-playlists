import {useState, useEffect} from 'react';
import usePlaylist from '../hooks/usePlaylist'
// import usePlaylist from '../hooks/usePlaylist'
import TrackTable from '../components/TrackTable';
import PlaylistBanner from '../components/PlaylistBanner';


function PlaylistView({accessToken, playlistID, playlist, removeTrack}) {
    // console.log("Playlist and tracks", playlist)
    // const [playlist] = usePlaylist(accessToken, playlistID)
    // console.log("Playlist view", playlistID, playlist.id)

    useEffect(() => {

    }, [playlistID])

    return(
        <div className="playlist">
            {playlist ? 
            <>
            <PlaylistBanner 
                name={playlist.name}
                owner={playlist.owner.display_name}
                numTracks={playlist.tracks.total}
            />
            <TrackTable 
                items={playlist.tracks.items}
                removeTrack={removeTrack}
            />
            </>
        :<span>No playlist loaded</span>}

        </div>
    )
}

export default PlaylistView