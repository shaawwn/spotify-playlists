
import {useEffect} from 'react'

import '../src/styles/App.css'
// import '../src/styles/components.css'
import '../src/styles/style.css'
import Login from './Login'
import Dashboard from '../src/components/Dashboard'

// http://localhost:3001 for dev
const devUrl = 'http://localhost:3001';
const appUrl = 'https://shaawwn.github.io/spotify-playlists/'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=a4a7e54594ce47ef93cc7eef30966349&response_type=code&redirect_uri=${appUrl}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20ugc-image-upload%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played%20user-follow-read`


const code = new URLSearchParams(window.location.search).get('code')

function App() {

  useEffect(() => {
    console.log("Loading app")
    // initialize the player here?
  }, [])

  return code ? <Dashboard code={code} />: <Login authUrl={AUTH_URL}/>
}


export default App;
