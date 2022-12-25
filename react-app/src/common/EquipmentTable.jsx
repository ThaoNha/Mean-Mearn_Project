/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Auth/authSlice';
import { getAllEquipment } from '../api/equipment/getAllEquipment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editEquipment } from '../api/equipment/editEquipment';
import { deleteEquipment } from '../api/equipment/deleteEquipment';
import { addEquipment } from '../api/equipment/addEquipment';
export default function EquipmentTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { equipment } = useSelector((state) => {
    return state.equipment;
  });
  const { typeData } = useSelector((state) => {
    return state.type;
  });

  const [equipmentIndex, setEquipmentIndex] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleDelete = (equipmentID) => {
    deleteEquipment(equipmentID).then((data) => {
      if (data.status === 200) {
        alert('Deleting is completed!');
        dispatch(getAllEquipment());
        window.location.reload();
      } else if (data.status === 401) {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
      } else {
        alert('Deleting is not completed!');
        dispatch(getAllEquipment());
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
                Would you like to delete this equipment?(
                {equipment[equipmentIndex - 1].id})
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
                  onClick={() => handleDelete(equipment[equipmentIndex - 1].id)}
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
        id: equipment[equipmentIndex - 1].id,
        name: equipment[equipmentIndex - 1].name,
        type: equipment[equipmentIndex - 1].type,
        description: equipment[equipmentIndex - 1].description,
        status: equipment[equipmentIndex - 1].status,
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: (values) => {
        editEquipment(values, equipment[equipmentIndex - 1].id).then((data) => {
          if (data.status === 200) {
            alert('Updating is completed!');
            dispatch(getAllEquipment());
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
                Edit Equipment
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
                    value={formik.values.id}
                    id='id'
                  >
                    {equipment[equipmentIndex - 1].id}
                  </label>
                </div>
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
                </div>
                <div className='form-group'>
                  <label className='col-form-label col-3'>Type:</label>
                  <select
                    id='type'
                    className='col-6'
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    {typeData.map((item, index) => {
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
                    Description:
                  </label>
                  <input
                    id='description'
                    type='text'
                    className='col-form-label col-6'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
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
                    <option value='available'>available</option>
                    <option value='borrowed'>borrowed</option>
                    <option value='repairing'>repairing</option>
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
        name: '',
        type: 'RAM',
        description: '',
        status: 'available',
      },
      validationSchema: Yup.object().shape({
        id: Yup.string().required('ID is required'),
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is required'),
        status: Yup.string().required('Status is required'),
      }),
      onSubmit: (values) => {
        console.log(values);
        addEquipment(values).then((data) => {
          if (data.status === 200) {
            alert('Add Equipment is complete!');
            dispatch(getAllEquipment());
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
                  <div className='form-group'>
                    <label className='col-form-label col-3'>Type:</label>
                    <select
                      id='type'
                      className='col-6'
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      {typeData &&
                        typeData.map((item, index) => {
                          return (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    {formik.errors.type && formik.touched.type && (
                      <p className='text-danger'>{formik.errors.type}</p>
                    )}
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Description:
                    </label>
                    <input
                      id='description'
                      type='text'
                      className='col-form-label col-6'
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.description &&
                      formik.touched.description && (
                        <p className='text-danger'>
                          {formik.errors.description}
                        </p>
                      )}
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
                      <option value='available'>available</option>
                      <option value='borrowed'>borrowed</option>
                      <option value='repairing'>repairing</option>
                      <option value='deleted'>deleted</option>
                    </select>
                    {formik.errors.status && formik.touched.status && (
                      <p className='text-danger'>{formik.errors.status}</p>
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
  const ListItems = () =>
    equipment.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.description || ''}</td>
          <td>{item.status}</td>
          <td className='row'>
            <div className='col-3'>
              <i
                className='fa fa-pencil'
                data-toggle='modal'
                data-target='#edit-modal'
                onClick={() => {
                  setEquipmentIndex(index + 1);
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
                    setEquipmentIndex(index + 1);
                    setShowDeleteModal(true);
                  }}
                ></i>
              )}
            </div>
          </td>
        </tr>
      );
    });
  return (
    <div className='container'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Type</th>
            <th scope='col'>Description</th>
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
        <tbody>{equipment && <ListItems />}</tbody>
      </table>

      {showEditModal && <ModalEdit />}
      {showDeleteModal && <ModalDelete />}
      {showAddModal && <ModalAdd />}
    </div>
  );
}
