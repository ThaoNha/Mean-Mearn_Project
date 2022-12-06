import { func } from 'prop-types';
import React from 'react';

export default function TodoItem({
  items,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
}) {
  const [modelIndex, setModelIndex] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  function renderTodoList(items) {
    return items.map((item, index) => {
      return (
        <tr key={index}>
          <th>{item.title}</th>
          <th>{item.description}</th>
          <th>{item.date}</th>
          <th>{item.status}</th>
          <th>
            <div className='btns'>
              <button onClick={() => completeTodoItem(index)}>
                {item.status === 'Active' ? 'Complete' : 'Active'}
              </button>
              <button
                data-toggle='modal'
                data-target='#exampleModal'
                onClick={() => {
                  setModelIndex(index);
                  setTitle(item.title);
                  setDescription(item.description);
                }}
              >
                Update
              </button>
              <button onClick={() => deleteTodoItem(index)}>X</button>
            </div>
          </th>
        </tr>
      );
    });
  }
  function editTodo(modelIndex) {
    return (
      <>
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title text-dark' id='exampleModalLabel'>
                  Update Todo
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
                <div className='form-group'>
                  <label
                    htmlFor='recipient-name'
                    className='col-form-label text-dark'
                  >
                    Title:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    defaultValue={items[modelIndex].title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label
                    htmlFor='message-text'
                    className='col-form-label text-dark'
                  >
                    Description:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    defaultValue={items[modelIndex].description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => updateTodoItem(modelIndex, title, description)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Date</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>{renderTodoList(items)}</tbody>
      </table>
      {items.length ? editTodo(modelIndex) : ''}
    </>
  );
}
