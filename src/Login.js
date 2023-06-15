import React from 'react';

/**
 * 
 * SCOPES USED 

    streaming user-read-email
    user-read-private user-library-read 
    user-library-modify 
    user-read-playback-state 
    user-modify-playback-state
    ugc-image-upload 
    playlist-modify-private
    playlist-modify-private 
    user-read-recently-played 
    user-follow-read'
 */

// const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=a4a7e54594ce47ef93cc7eef30966349&response_type=code&redirect_uri=http://localhost:3001&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20ugc-image-upload%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played%20user-follow-read'

export default function Login({authUrl}) {
    
    return(
        <div className="login view" style={{paddingTop: '300px'}}>
            <h1 style={{textAlign: 'center', marginBottom: '20px', fontSize: '36px'}}>Login with Spotify</h1>
            <a href={authUrl} className="btn login-btn" data-testid={'login-btn'} >Login</a>
        </div>
    )
}