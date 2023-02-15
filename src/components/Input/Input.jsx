import { BiSearch } from "react-icons/bi"
import "./GlobalInput.css"

export const GlobalInput = ({filter, setFilter}) => {
    return (
        <form className="globalForm">
        <input className='header__input' value={filter} onChange={(evt) => setFilter(evt.target.value)}  type="search" placeholder='Search' aria-label='Search'/>
        <button className='header__btn' type='submit'>
            <BiSearch size={22} />
            </button>
      
       </form>
    )
}