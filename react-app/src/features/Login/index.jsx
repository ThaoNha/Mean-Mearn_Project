/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function index() {
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
      console.log(values);
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
