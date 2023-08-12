import {useState, useEffect} from 'react';
import usePlaylist from '../hooks/usePlaylist'
// import usePlaylist from '../hooks/usePlaylist'
import TrackTable from '../components/TrackTable';
import PlaylistBanner from '../components/PlaylistBanner';import PlaylistSettings from '../components/PlaylistSettings';


function PlaylistView({accessToken, playlistID, playlist, removeTrack, editDetails, unfollowPlaylist, toggleView, play, pause}) {

    function displayView() {
        return(
            <div className="playlist">
            {playlist ? 
            <>
            <PlaylistBanner 
                name={playlist.name}
                owner={playlist.owner.display_name}
                numTracks={playlist.tracks.total}
                image={playlist.images}
                editDetails={editDetails}
                unfollowPlaylist={unfollowPlaylist}
                toggleView={toggleView}
            />
            <TrackTable 
                items={playlist.tracks.items}
                removeTrack={removeTrack}
                play={play}
                pause={pause}
                context={playlist}
            />
            </>
        :<span>No playlist loaded</span>}

        </div>
        )
    }
    useEffect(() => {

    }, [playlistID])

    return(
        <>
            {displayView()}
        </>
    )
}

export default PlaylistView