import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import logo from '../assets/react.svg';
import '../index.css'
function Header() {
  return (
    <header>
        <Link to='/' className='logo'>
                <img src={logo}  className='title'/>React Js
        </Link>
        <nav className='nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/books'>Books</NavLink>
            <NavLink to='/about'>About</NavLink>
        </nav>
    </header>
  )
}

export default Header