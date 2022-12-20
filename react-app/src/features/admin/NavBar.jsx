import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  return (
    <>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm border border-2 border-gray mx-auto my-4'>
          <div className='nav-item col'>
            <NavLink
              className={`nav-link font-weight-bold ${
                location.pathname === '/admin/equipment'
                  ? 'text-dark'
                  : 'text-secondary'
              }`}
              to='/admin/equipment'
            >
              Equipment
            </NavLink>
          </div>
          <div className='nav-item col'>
            <NavLink
             className={`nav-link font-weight-bold ${
              location.pathname === '/admin/history'
                ? 'text-dark'
                : 'text-secondary'
            }`}
              to='/admin/history'
            >
              History
            </NavLink>
          </div>
          <div className='nav-item col'>
            <NavLink
             className={`nav-link font-weight-bold ${
              location.pathname === '/admin/user'
                ? 'text-dark'
                : 'text-secondary'
            }`}
              to='/admin/user'
            >
              User
            </NavLink>
          </div>
          <div className='nav-item col'>
            <NavLink
             className={`nav-link font-weight-bold ${
              location.pathname === '/admin/role'
                ? 'text-dark'
                : 'text-secondary'
            }`}
              to='/admin/role'
            >
              Role
            </NavLink>
          </div>
          <div className='nav-item col'>
            <NavLink
            className={`nav-link font-weight-bold ${
              location.pathname === '/admin/type'
                ? 'text-dark'
                : 'text-secondary'
            }`}
              to='/admin/type'
            >
              Type
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}
