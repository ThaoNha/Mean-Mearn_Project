import './App.css';
import { useState, useEffect } from "react";
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

function App() {

  const [todoItems, setTodoItems] = useState(() => {
    const savedTodoItems = localStorage.getItem("todoItems");
    if (savedTodoItems) {
      return JSON.parse(savedTodoItems);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  const createTodoItem = (title, description) => {
    const d = new Date();
    const date = (d.getDate()<10?'0'+d.getDate():d.getDate()) + '/' + d.getMonth() + '/' + d.getFullYear();
    const newTodoItems = [
      ...todoItems,
      { title, description, date, status: 'Active' },
    ];
    setTodoItems(newTodoItems);
  };
  const deleteTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };
  const completeTodoItem = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].status === 'Active'
      ? (newTodoItems[index].status = 'Completed')
      : (newTodoItems[index].status = 'Active');
    setTodoItems(newTodoItems);
  };
  const updateTodoItem = (index, title, description) => {
    const newTodoItems = [...todoItems];
    const item = newTodoItems[index];
    let todoObj = {
      title: title,
      description: description,
      date: item.date,
      status: item.status,
    };
    newTodoItems.splice(index, 1, todoObj);
    setTodoItems(newTodoItems);
  };
  return (
    <div className='app container'>
      <TodoInput createTodoItem={createTodoItem} />
      <TodoItem
        items={todoItems}
        deleteTodoItem={deleteTodoItem}
        completeTodoItem={completeTodoItem}
        updateTodoItem={updateTodoItem}
      />
    </div>
  );
}

export default App;
