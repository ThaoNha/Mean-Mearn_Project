/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../api/auth/login';

export default function index() {
  const { userInfo, status } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 200) {
      switch (userInfo.role) {
        case 'user':
          navigate('/user/history');
          break;
        case 'manager':
          navigate('/admin/equipment');
          break;
        default:
          break;
      }
    }
  }, [status, navigate, userInfo]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <>
      <div className='row my-5'>
        <div className='col-md-5 mx-auto'>
          <div id='first'>
            <div className='myform form '>
              <div className='logo mb-3'>
                <div className='col-md-12 text-center'>
                  <h1>Login</h1>
                </div>
              </div>
              {status && status !== 200 && (
                <div className='text-danger'>{userInfo}</div>
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                    type='text'
                    className='form-control'
                    id='email'
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <p className='text-danger'>{formik.errors.username}</p>
                  )}
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className='text-danger'>{formik.errors.password}</p>
                  )}
                </div>
                <div className='col-md-12 text-center mt-5'>
                  <button
                    type='submit'
                    className=' btn btn-block mybtn btn-primary tx-tfm'
                  >
                    Login
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
