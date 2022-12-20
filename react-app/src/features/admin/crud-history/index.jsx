import React from 'react';
import HistoryTable from '../../../common/HistoryTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';

export default function index() {
  return (
    <>
      <Header />
      <NavBar />
      <HistoryTable />
    </>
  );
}
