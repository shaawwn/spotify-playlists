import {useState, useEffect} from 'react';
import useHistory from '../hooks/useHistory'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'

function HistoryNavigator({history, toggleView}) {
    
    function handleClick(direction) {
        console.log("Hitting", direction)
        if(direction === 'back') {
            let [view, content] = history.back()
            // console.log("View: ", view, "Content: ", content)
            toggleView(view, content, false)
        } else if(direction === 'next') {
            let [view, content] = history.forward()
            toggleView(view, content, false)
        }
    }

    useEffect(() => {

    }, [history])

    return(
        <div className="history-nav">
            <FontAwesomeIcon        className="history-nav-icon" 
                icon={faCaretLeft} 
                size="2x"
                onClick={() => handleClick('back')}
            />
            <FontAwesomeIcon    className="history-nav-icon" 
                icon={faCaretRight} 
                size="2x"
                onClick={() => handleClick('next')}
            />
        </div>
    )
}

export default HistoryNavigator