

function PlaylistBanner({name, owner, numTracks}) {

    return(
        <div className="playlist-banner">
            <p className="playlist-banner-name">{name} by {owner} {numTracks} tracks</p>
            <button className="playlist-banner-btn" >Edit playlist details</button>
        </div>
        
    )
}

export default PlaylistBanner