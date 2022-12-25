/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import HistoryTable from '../../../common/HistoryTableAdmin';
import Header from '../../../common/Header';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllHistory } from '../../../api/history/getAllHistory';
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHistory());
  }, [dispatch, navigate]);
  return (
    <>
      <Header />
      <NavBar />
      <HistoryTable />
    </>
  );
}
