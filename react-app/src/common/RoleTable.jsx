import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAllRole } from '../api/role/getAllRole';
import { deleteRole } from '../api/role/deleteRole';
import { updateRole } from '../api/role/updateRole';
import { createRole } from '../api/role/createRole';

export default function RoleTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roleData } = useSelector((state) => {
    return state.role;
  });
  const [roleIndex, setRoleIndex] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const ListItems = () =>
    roleData.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.status}</td>
          <td className='row'>
            <div className='col-3'>
              <i
                className='fa fa-pencil'
                data-toggle='modal'
                data-target='#edit-modal'
                onClick={() => {
                  setRoleIndex(index + 1);
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
                    setRoleIndex(index + 1);
                    setShowDeleteModal(true);
                  }}
                ></i>
              )}
            </div>
          </td>
        </tr>
      );
    });
  const handleDelete = (roleName) => {
    deleteRole(roleName).then((data) => {
      if (data.status === 200) {
        alert('Deleting is completed!');
        dispatch(getAllRole());
        window.location.reload();
      } else if (data.status === 401) {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
      } else {
        alert('Deleting is not completed!');
        dispatch(getAllRole());
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
                Would you like to delete this role?(
                {roleData[roleIndex - 1].name})
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
                  onClick={() => handleDelete(roleData[roleIndex - 1].name)}
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
        name: roleData[roleIndex - 1].name,
        status: roleData[roleIndex - 1].status,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: (values) => {
        console.log(values);
        updateRole(values, roleData[roleIndex - 1].name).then((data) => {
          if (data.status === 200) {
            alert('Updating is completed!');
            dispatch(getAllRole());
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
                Edit Role
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
                    Name:
                  </label>
                  <input
                    id='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    htmlFor='recipient-name'
                    className='col-form-label col-3'
                  />
                </div>
                <div className='form-group'>
                  <label className='col-form-label col-3'>Role:</label>
                  <select
                    id='status'
                    className='col-6'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <option value='active'>active</option>
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
        name: '',
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
      }),
      onSubmit: (values) => {
        console.log(values);
        createRole(values).then((data) => {
          if (data.status === 200) {
            alert('Add Equipment is complete!');
            dispatch(getAllRole());
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
                  Add Role
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
                      Name:
                    </label>
                    <input
                      id='name'
                      type='text'
                      className='col-form-label col-6'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className='text-danger'>{formik.errors.name}</p>
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
            <th scope='col'>Name</th>
            <th scope='col'>Status</th>
            <th scope='col'>
              Function
              <i
                className='fa fa-plus-circle pl-3'
                data-toggle='modal'
                data-target='#modal-add'
                onClick={() => setShowAddModal(true)}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>{roleData && <ListItems />}</tbody>
      </table>
      {showEditModal && <ModalEdit />}
      {showDeleteModal && <ModalDelete />}
      {showAddModal && <ModalAdd />}
    </div>
  );
}
