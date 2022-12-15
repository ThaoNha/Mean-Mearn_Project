import React from 'react';

export default function HistoryTable() {
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
        <tbody className='text-white'>
          <tr>
            <th scope='row'>1</th>
            <td>Mark</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
