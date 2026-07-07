import React from 'react'
import { Link } from "react-router-dom";
import '../styles/Header.css'
function Header() {
  return (
    <>
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">📊</span>
        <span className="navbar-title">DataLens</span>
      </div>
      <ul className="navbar-links">
        <li>
        <Link to='/' className="navbar-link">data information</Link>
        </li>
        <li>
        <Link to='/datacleaning' className="navbar-link">data cleaning</Link>
        </li>
        <li>
        <Link to='/visualization' className="navbar-link">data Visualization</Link>
        </li>
        <li>
        <Link to='/downloaddataset' className="navbar-link">download dataset</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default Header