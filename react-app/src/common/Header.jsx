import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm border border-2 border-gray mx-auto my-4'>
          <div className='container'>
            <h1> Equipment Manager</h1>
          </div>
        </nav>
      </div>
    </>
  );
}
