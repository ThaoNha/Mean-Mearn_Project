/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';
import { getAllHistory } from '../api/history/getAllHistory';
import { returnEquipment } from '../api/history/returnEquipment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addHistory } from '../api/history/addHistory';
import { useState } from 'react';
import { getRoleUser } from '../api/user/getRoleUser';
import { getEquipmentActive } from '../api/equipment/getEquipmentActive';
export default function HistoryTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const { data } = useSelector((state) => {
    return state.history;
  });
  const getUsers = async () => {
    const response = await getRoleUser();
    if (response.status === 400 || response.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const getEquipment = async () => {
    const response = await getEquipmentActive();
    if (response.status === 400 || response.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
    setEquipments(response.data);
  };
  useEffect(() => {
    getEquipment();
  }, []);
  const formik = useFormik({
    initialValues: {
      userId: '',
      equipmentId: '',
    },
    validationSchema: Yup.object().shape({
      userId: Yup.string().required('UserID is required'),
      equipmentId: Yup.string().required('EquipmentID is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addHistory(values).then((data) => {
        if (data.status === 200) {
          alert('Add History is complete!');
          dispatch(getAllHistory());
          window.location.reload();
        } else if (data.status === 401) {
          dispatch(logout());
          navigate('/login');
          window.location.reload();
        } else {
          alert(data.data);
          window.location.reload();
        }
      });
    },
  });
  const handleReturnEquipment = async (historyID) => {
    const response = await returnEquipment(historyID);
    if (response.status === 200) {
      dispatch(getAllHistory());
    } else if (response.status === 400 || response.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
  };
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
          {item.returnDate ? (
            <td className=''>Returned</td>
          ) : (
            <td
              className='fa fa-sign-out'
              onClick={() => handleReturnEquipment(item.historyID)}
            >
              Return
            </td>
          )}
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
            <th scope='col'>
              Function
              <i
                className='fa fa-plus-circle pl-3'
                data-toggle='modal'
                data-target='#modal-add'
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>{data && <ListItems />}</tbody>
      </table>
      <div
        className='modal fade'
        id='modal-add'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add History
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    UserID:
                  </label>

                  <select
                    id='userId'
                    type='text'
                    className='col-form-label col-6'
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                  >
                    <option value=''>Choose User ID</option>
                    {users &&
                      users.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.id}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {formik.errors.userId && formik.touched.userId && (
                  <p className='text-danger'>{formik.errors.userId}</p>
                )}
                <div className='form-group'>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    EquipmentID:
                  </label>

                  <select
                    id='equipmentId'
                    type='text'
                    className='col-form-label col-6'
                    value={formik.values.equipmentId}
                    onChange={formik.handleChange}
                  >
                    <option value=''>Choose Equipment ID</option>
                    {equipments &&
                      equipments.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.id}
                          </option>
                        );
                      })}
                  </select>
                  {formik.errors.equipmentId && formik.touched.equipmentId && (
                    <p className='text-danger'>{formik.errors.equipmentId}</p>
                  )}
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
