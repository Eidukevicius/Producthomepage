import React from 'react';
import User from '../user/User';
import { Link } from 'react-router-dom';

const Header = ()=>{
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-black mb-5">
        <div className='container px-4 px-lg-5'>
          <a className="navbar-brand text-white" to="/">Produktų duomenų bazė</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Visi produktai</Link>
              </li>
              <User/>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Header