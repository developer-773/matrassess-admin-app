import React, { useRef } from 'react'
import "./Header.css"
import {BiSearch} from "react-icons/bi"
import { Avatar } from '../../../assets/icons'
import { Table } from '../../Table'

export const Header = ({}) => {


  return (
    <header className='header'>
        <div className="container">
            <div className="header__wrapper">
           <form>
            <input className='header__input' type="search" placeholder='Search' aria-label='Search'/>
            <button className='header__btn' type='submit'>
            <BiSearch size={22} />
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
