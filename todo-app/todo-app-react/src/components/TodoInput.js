import React from 'react';

export default function TodoInput({ createTodoItem }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      return console.log('Please add something to-do');
    }
    createTodoItem(title,description);
    setTitle('');
    setDescription('');
  };
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <form className='mb-3' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Create todo'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Description todo'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>
    </form>
  );
}
