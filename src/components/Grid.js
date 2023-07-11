import {useState, useEffect, useRef, useCallback} from 'react';

import GridCard from '../components/GridCard';
import AddPlaylistCard from '../components/AddPlaylistCard'

function Grid({playlists, scroll, toggleView, createPlaylist, numPlaylists}) {
    const [loading, setLoading] = useState(true) // after content has loaded set to false
    const dummyAmount = useRef(0)
    const observer = useRef()

    const lastPlaylistElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(playlists => {
            if(playlists[playlists.length - 1].isIntersecting) {
                scroll()
            }
        })
        if(node) observer.current.observe(node)
    }, [loading])


    function _getDummyAmount() {
        let dummyAmount = 0
        if(numPlaylists % 5 !== 0) {
            while(numPlaylists % 5 !== 0) {
                numPlaylists += 1
                dummyAmount += 1
            }
        }
        return dummyAmount - 1
    }
    function displayGrid() {
        dummyAmount.current = _getDummyAmount()
        return(
            <>
            {playlists.map((playlist, index) => {
                if(playlists.length === index + 1) {
                    // last card to add observer to
                    return <GridCard 
                                innerRef={lastPlaylistElement} 
                                key={playlist.id} 
                                playlist={playlist}
                                toggleView={toggleView}
                            />
                } else {
                    return <GridCard 
                                key={playlist.id} 
                                playlist={playlist}
                                toggleView={toggleView}
                            />
                }

            })}
            
            </>
        )
    }

    useEffect(() => {
        if(loading) {
            setLoading(false)
        } 
        dummyAmount.current = _getDummyAmount()
    }, [])

    return(
        <div className="grid-container">
            <div className="grid">
                <AddPlaylistCard 
                    createPlaylist={createPlaylist} 
                    />
                {playlists.length > 0 ? displayGrid() : <h1>No playlists!</h1> }
                {playlists % 5 !== 0 ? 
                    // add dummys
                    [...Array(dummyAmount.current)].map((e, i) => 
                    <GridCard 
                        playlist={null} 
                        toggleView={toggleView}
                        key={i}
                        />)
                :<span></span>}

            </div>
        </div>
    )
}

export default Grid

// function handleScroll() {

//     if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
//         // window.scrollTo(0, document.documentElement.scrollTop)
//         // scroll()
//         console.log(window.innerHeight + Math.round(window.scrollY), document.body.scrollHeight)
//     } 
// }

        // window.addEventListener('scroll', handleScroll)
        // return () => {
        //     window.removeEventListener('scroll', handleScroll)
        // }