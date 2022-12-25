/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import TypeTable from '../../../common/TypeTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllType } from '../../../api/type/getAllType';
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllType());
  }, [dispatch, navigate]);
  return (
    <>
      <Header />
      <NavBar />
      <TypeTable />
    </>
  );
}
