import Login from './features/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import History from './features/user/history_equipment';
import Profile from './features/user/profile';

import Equipment from './features/admin/crud-equipment';
import HistoryAdmin from './features/admin/crud-history';
import Role from './features/admin/crud-role';
import Type from './features/admin/crud-type';
import User from './features/admin/crud-user';

function App() {
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/user/history' element={<History />}></Route>
          <Route path='/user/profile' element={<Profile />}></Route>
          <Route path='/admin/equipment' element={<Equipment />}></Route>
          <Route path='/admin/history' element={<HistoryAdmin />}></Route>
          <Route path='/admin/role' element={<Role />}></Route>
          <Route path='/admin/type' element={<Type />}></Route>
          <Route path='/admin/user' element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
