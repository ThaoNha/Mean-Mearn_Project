import React from 'react';

export default function UserTable() {
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
          </tr>
        </thead>
        <tbody className='text-white'>
          <tr>
            <th scope='row'>1</th>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
