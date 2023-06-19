import {useState, useEffect, useRef, useCallback} from 'react';

import GridCard from '../components/GridCard';


function Grid({playlists, scroll, toggleView}) {

    const [loading, setLoading] = useState(true) // after content has loaded set to false

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


    function displayGrid() {
        // console.log("GRID PLAYLISTS", playlists)

        return(
            <>
            {playlists.map((playlist, index) => {
                if(playlists.length === index + 1) {
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
    }, [])

    return(
        <div className="grid-container">
            <div className="grid">
                <GridCard playlist={null}/>
                {playlists.length > 0 ? displayGrid() : <h1>No playlists!</h1> }
                {playlists % 5 !== 0 ? 
                    // add dummys
                    <GridCard 
                        playlist={null} 
                        toggleView={toggleView}
                        />
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