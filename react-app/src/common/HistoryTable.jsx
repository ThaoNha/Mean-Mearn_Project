/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { historyUserData } from '../api/history/historyUserData';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/Auth/authSlice';
export default function HistoryTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await historyUserData();
    if (response.status === 400 || response.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const ListItems = () =>
    data.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.equipmentID}</td>
          <td>{item.borrowDate}</td>
          <td>{item.returnDate || ''}</td>
          <td>{item.lender}</td>
          <td>{item.adminReceiver || ''}</td>
        </tr>
      );
    });
  return (
    <div className='container'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>UserName</th>
            <th scope='col'>Equipment</th>
            <th scope='col'>Borrow Date</th>
            <th scope='col'>Return Date</th>
            <th scope='col'>Lender</th>
            <th scope='col'>Admin Receiver</th>
          </tr>
        </thead>
        <tbody>{data && <ListItems />}</tbody>
      </table>
    </div>
  );
}
