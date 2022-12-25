/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logout } from '../features/Auth/authSlice';
import { changePassword } from '../api/auth/changePassword';
import { profile } from '../api/auth/profile';
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const { profileData, role, status } = useSelector((state) => {
    return state.profile;
  });
  useEffect(() => {
    dispatch(profile());
  }, []);
  useEffect(() => {
    if (profileData) {
      if (status === 200) {
        const pathname = window.location.pathname;
        if (role === 'user' && !pathname.includes('user/'))
          navigate('/user/history');
        if (role === 'manager' && !pathname.includes('admin'))
          navigate('/admin/equipment');
      } else if (status === 400 || status === 401) {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [navigate, profileData, dispatch]);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().required('newPassword is required'),
      repeatPassword: Yup.string().required('repeatPassword is required'),
    }),
    onSubmit: (values) => {
      if (values.newPassword === values.repeatPassword) {
        changePassword(values.newPassword).then((data) => {
          if (data) {
            if (data.status === 200) {
              setResult('Updating is completed!');
              setError('');
            } else if (data.status === 401) {
              dispatch(logout());
              navigate('/login');
              window.location.reload();
            } else {
              setError('Updating is not completed!');
              setResult('');
            }
          }
        });
        formik.resetForm();
      } else {
        setError('New Password is matched Repeat Password!');
        setResult('');
      }
    },
  });

  return (
    <>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm border border-2 border-gray mx-auto my-4'>
          <div className='container'>
            <h1> Equipment Management</h1>
            <div
              className='collapse navbar-collapse justify-content-end'
              id='navbarSupportedContent'
            >
              <div className='dropdown'>
                <i
                  className='fa fa-user-o fa-2x mt-2 mr-3'
                  role='button'
                  data-toggle='dropdown'
                  aria-expanded='false'
                ></i>
                <div className='dropdown-menu'>
                  <i
                    role='button'
                    className='dropdown-item'
                    data-toggle='modal'
                    data-target='#user-information'
                    data-whatever='@getbootstrap'
                  >
                    User Information
                  </i>
                  <i
                    className='dropdown-item'
                    role='button'
                    data-toggle='modal'
                    data-target='#change-password'
                    data-whatever='@getbootstrap'
                  >
                    Change Password
                  </i>
                </div>
              </div>
              <NavLink
                to='/login'
                className='fa fa-sign-out fa-2x mt-2'
                onClick={() => dispatch(logout())}
              ></NavLink>
            </div>
          </div>
        </nav>
      </div>
      {profileData && (
        <div
          className='modal fade'
          id='user-information'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  User Information
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
                <form>
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
                      {profileData.id}
                    </label>
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Username:
                    </label>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      {profileData.username}
                    </label>
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Role:
                    </label>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      {role}
                    </label>
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      Status:
                    </label>
                    <label
                      htmlFor='recipient-name'
                      className='col-form-label col-3'
                    >
                      {profileData.status}
                    </label>
                  </div>
                </form>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className='modal fade'
        id='change-password'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel1'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel1'>
                Change Password
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={() => {
                  setResult('');
                  setError('');
                  formik.resetForm();
                }}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {error && <p className='text-danger'>{error}</p>}
              {result && <p className='text-success'>{result}</p>}
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='recipient-name' className='col-form-label'>
                    New Password:
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='new-password'
                    name='newPassword'
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.newPassword && formik.touched.newPassword && (
                    <p className='text-danger'>{formik.errors.newPassword}</p>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='recipient-name' className='col-form-label'>
                    Repeat Password:
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='repeat-password'
                    name='repeatPassword'
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.repeatPassword &&
                    formik.touched.repeatPassword && (
                      <p className='text-danger'>
                        {formik.errors.repeatPassword}
                      </p>
                    )}
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                    onClick={() => {
                      setResult('');
                      setError('');
                    }}
                  >
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
