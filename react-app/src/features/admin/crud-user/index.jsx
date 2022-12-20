import React from 'react';
import UserTable from '../../../common/UserTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';

export default function index() {
  return (
    <>
      <Header />
      <NavBar />
      <UserTable />
    </>
  );
}
