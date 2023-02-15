import "./Header.css"
import { Avatar } from '../../../assets/icons'

export const Header = () => {


  return (
    <header className='header'>
        <div className="container">
            <div className="header__wrapper">
           <form>
            <input className='header__input' type="search"
            placeholder='Search' aria-label='Search'/>
            <button className='header__btn head-btn' type='submit'>
            </button>
           </form>
            <span className='header__avatar pe-5'>
                <Avatar />
                Kimdur Ismi
            </span>
            </div>
        </div>
    </header>
  )
}
