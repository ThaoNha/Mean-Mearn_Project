/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import UserTable from '../../../common/UserTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllUser } from '../../../api/user/getAllUser';

export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch, navigate]);
  return (
    <>
      <Header />
      <NavBar />
      <UserTable />
    </>
  );
}
