import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import { GiDelicatePerfume } from 'react-icons/gi';
import { IoHomeSharp } from 'react-icons/io5';
import { useAuth } from '../../context/auth';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (

        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand"><GiDelicatePerfume />ESSENZA</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link"><IoHomeSharp /></NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/quiz" className="nav-link">Perfume Quiz</NavLink>
        </li>
       
     {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                <li className ="nav-item dropdown">
               < NavLink
                 className="nav-link dropdown-toggle"
                href="# " role ="button" 
                data-bs-toggle="dropdown"
               aria-expanded="false"  >
               {auth?.user?.name}
               </NavLink>
               <ul className="dropdown-menu">
                <li><NavLink to ="/dashboard" className="dropdown-item">
                Dashboard</NavLink></li>
                <li>
                <NavLink

                      onClick={handleLogout}
                      to="/login"
                    className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                    </li>
               </ul>
                </li>
                
              </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;