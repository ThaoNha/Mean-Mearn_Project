import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';
import { getAllUser } from '../api/user/getAllUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { deleteUser } from '../api/user/deleteUser';
import { createUser } from '../api/user/createUser';
import { editUser } from '../api/user/editUser';

export default function UserTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.user;
  });
  const { roleData } = useSelector((state) => {
    return state.role;
  });

  const [userIndex, setUserIndex] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const ListItems = () =>
    user.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.role}</td>
          <td>{item.status}</td>
          <td className='row'>
            <div className='col-3'>
              <i
                className='fa fa-pencil'
                data-toggle='modal'
                data-target='#edit-modal'
                onClick={() => {
                  setUserIndex(index + 1);
                  setShowEditModal(true);
                }}
              ></i>
            </div>
            <div className='col-3'>
              {item.status === 'deleted' ? (
                <i className='fa fa-trash-o'></i>
              ) : (
                <i
                  data-toggle='modal'
                  data-target='#modal-delete'
                  className='fa fa-trash'
                  onClick={() => {
                    setUserIndex(index + 1);
                    setShowDeleteModal(true);
                  }}
                ></i>
              )}
            </div>
          </td>
        </tr>
      );
    });
  const handleDelete = (userID) => {
    deleteUser(userID).then((data) => {
      if (data.status === 200) {
        alert('Deleting is completed!');
        dispatch(getAllUser());
        window.location.reload();
      } else if (data.status === 401) {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
      } else {
        alert('Deleting is not completed!');
        dispatch(getAllUser());
        window.location.reload();
      }
    });
  };
  const ModalDelete = () => {
    return (
      <>
        <div
          className='modal fade'
          id='modal-delete'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Delete Equipment
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
                Would you like to delete this user?(
                {user[userIndex - 1].id})
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  No
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => handleDelete(user[userIndex - 1].id)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ModalEdit = () => {
    const formik = useFormik({
      initialValues: {
        role: user[userIndex - 1].role,
        status: user[userIndex - 1].status,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: (values) => {
        editUser(values, user[userIndex - 1].id).then((data) => {
          if (data.status === 200) {
            alert('Updating is completed!');
            dispatch(getAllUser());
            window.location.reload();
          } else if (data.status === 401) {
            dispatch(logout());
            navigate('/login');
            window.location.reload();
          } else {
            alert('Updating is not completed!');
            window.location.reload();
          }
        });
      },
    });
    return (
      <div
        className='modal fade'
        id='edit-modal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit User
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
                    ID:
                  </label>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    {user[userIndex - 1].id}
                  </label>
                </div>
                <div className='form-group'>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    Name:
                  </label>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    {user[userIndex - 1].username}
                  </label>
                </div>
                <div className='form-group'>
                  <label className='col-form-label col-3'>Role:</label>
                  <select
                    id='role'
                    className='col-6'
                    value={formik.values.role}
                    onChange={formik.handleChange}
                  >
                    {roleData
                      .filter((item) => item.status !== 'deleted')
                      .map((item, index) => {
                        return (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className='form-group'>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  >
                    Status:
                  </label>
                  <select
                    id='status'
                    type='text'
                    className='col-form-label col-6'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <option value='active'>active</option>
                    <option value='block'>block</option>
                    <option value='deleted'>deleted</option>
                  </select>
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const ModalAdd = () => {
    const formik = useFormik({
      initialValues: {
        id: '',
        username: '',
        password: '',
        role: 'user',
      },
      validationSchema: Yup.object().shape({
        id: Yup.string().required('ID is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        role: Yup.string().required('Role is required'),
      }),
      onSubmit: (values) => {
        createUser(values).then((data) => {
          if (data.status === 200) {
            alert('Add Equipment is complete!');
            dispatch(getAllUser());
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
    return (
      <>
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
                  Add Equipment
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
                      ID:
                    </label>
                    <input
                      id='id'
                      type='text'
                      className='col-form-label col-6'
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.id && formik.touched.id && (
                      <p className='text-danger'>{formik.errors.id}</p>
                    )}
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Username:
                    </label>
                    <input
                      id='username'
                      type='text'
                      className='col-form-label col-6'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.touched.username && (
                      <p className='text-danger'>{formik.errors.username}</p>
                    )}
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Password:
                    </label>
                    <input
                      id='password'
                      type='text'
                      className='col-form-label col-6'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className='text-danger'>{formik.errors.password}</p>
                    )}
                  </div>
                  <div className='form-group'>
                    <label className='col-form-label col-3'>Role:</label>
                    <select
                      id='role'
                      className='col-6'
                      value={formik.values.role}
                      onChange={formik.handleChange}
                    >
                      {roleData &&
                        roleData.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    {formik.errors.role && formik.touched.role && (
                      <p className='text-danger'>{formik.errors.role}</p>
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
      </>
    );
  };

  return (
    <div className='container'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Id</th>
            <th scope='col'>Username</th>
            <th scope='col'>Role</th>
            <th scope='col'>Status</th>
            {
              <th scope='col'>
                Function
                <i
                  className='fa fa-plus-circle pl-3'
                  data-toggle='modal'
                  data-target='#modal-add'
                  onClick={() => setShowAddModal(true)}
                ></i>
              </th>
            }
          </tr>
        </thead>
        <tbody>{user && <ListItems />}</tbody>
      </table>
      {showEditModal && <ModalEdit />}
      {showDeleteModal && <ModalDelete />}
      {showAddModal && <ModalAdd />}
    </div>
  );
}
