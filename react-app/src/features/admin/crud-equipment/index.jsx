/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import EquipmentTable from '../../../common/EquipmentTable';
import Header from '../../../common/Header';
import NavBar from '../NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllEquipment } from '../../../api/equipment/getAllEquipment';
import { getAllType } from '../../../api/type/getAllType';
export default function index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEquipment());
  }, [dispatch, navigate]);
  useEffect(() => {
    dispatch(getAllType());
  }, [dispatch, navigate]);
  return (
    <>
      <Header />
      <NavBar />
      <EquipmentTable />
    </>
  );
}
