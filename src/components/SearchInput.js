import {useEffect, useRef} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchInput({handleSearch, searchState}) {


    function handleChange(e) {
        e.stopPropagation()
        handleSearch(e.target.value)
    }
    
    function displayInput() {
        return(
            <input className="search-input" placeholder="Search for items" onChange={handleChange} ></input>
        )
    }
    useEffect(() => {
        console.log("State change in input")
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