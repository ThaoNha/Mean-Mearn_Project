import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/Auth/authSlice';
import { getProfile } from '../api/getProfile';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../api/change-password';
import { getNewToken } from '../api/getNewToken';
import { useEffect } from 'react';
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  useEffect(() => {
    dispatch(getProfile()).then((response) => {
      if (response && response.payload.status === 401) navigate('/login');
      const href = window.location.href.split('/');
      if (href[3] === 'user' && response.payload.data.role.name === 'manager')
        navigate('/admin/equipment');
      else if (
        href[3] === 'admin' &&
        response.payload.data.role.name === 'user'
      )
        navigate('/user/history');
      setData(response.payload.data);
    });
    const tokenTime = localStorage.getItem('tokenTime')
      ? localStorage.getItem('tokenTime')
      : null;
    const time = new Date().getTime();
    if (time - tokenTime > 600000) navigate('/login');
    else if (time - tokenTime >= 500000) {
      dispatch(getNewToken()).then((data) => {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('tokenTime', new Date().getTime());
      });
    }
  }, [dispatch, navigate]);

  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

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
        dispatch(changePassword(values.newPassword)).then((data) => {
          if (data && data.payload) {
            if (data.payload.status === 200) {
              setStatus('Updating is completed!');
              setError('');
            } else {
              setError('Updating is not completed!');
              setStatus('');
            }
          }
        });
        formik.resetForm();
      } else {
        setError('New Password is matched Repeat Password!');
        setStatus('');
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
      {data && (
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
                      {data.id}
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
                      {data.username}
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
                      {data.role.name}
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
                      {data.status}
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
                  setStatus('');
                  setError('');
                }}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div className='modal-body'>
              {error && <p className='text-danger'>{error}</p>}
              {status && <p className='text-success'>{status}</p>}
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
                      setStatus('');
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
