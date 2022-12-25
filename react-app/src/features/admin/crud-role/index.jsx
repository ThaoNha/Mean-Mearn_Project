/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import RoleTable from '../../../common/RoleTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllRole } from '../../../api/role/getAllRole';
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRole());
  }, [dispatch, navigate]);
  return (
    <>
      <Header />
      <NavBar />
      <RoleTable />
    </>
  );
}
