import {useEffect, useRef} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchInput({handleSearch, searchState}) {

    // console.log("Search state", searchState)
    function handleChange(e) {
        e.stopPropagation()
        handleSearch(e.target.value)
    }
    
    function displayInput() {
        if(searchState === true) {
            return(
                <input className="search-input" placeholder="Search for items" onChange={handleChange}></input>
            )  
        } else {
            return(
                <span></span>
            )
        }
    }
    useEffect(() => {

    }, [searchState])

    return(
        <>
            {displayInput()}
        </>
    )
    // return(
    //     <input className="search-input" placeholder="Search for items" onChange={handleChange} ></input>
    // )
}

export default SearchInput