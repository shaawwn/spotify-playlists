import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function SearchInput({handleSearch}) {

    function handleChange(e) {
        e.stopPropagation()
        handleSearch(e.target.value)

    }
    
    return(
        <input className="search-input" placeholder="Search for items" onChange={handleChange}></input>
    )
}

export default SearchInput