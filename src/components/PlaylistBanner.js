

function PlaylistBanner({name, owner, numTracks}) {

    return(
        <p className="playlist-banner-name">{name} by {owner} {numTracks} tracks</p>
    )
}

export default PlaylistBanner