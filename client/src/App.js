import './App.css';
import LogIn from './components/Autofication/LogIn';
import SignUp from './components/Autofication/SignUp';
import MainPage from './components/MainPage/MPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/NavBar/Header';
import Profile from './components/Profile/Profile';
import ItemPage from './components/ItemPage/ItemPage';
import EditGood from './components/Goods/editGoods/EditGoods';
import Favorite from './components/Favorite/FavoritePage/Favorite';
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { checkUser } from '../src/api/userApi';
import userStore from './store/userStore';
import EditProfile from './components/Profile/EditProfile';


const App = observer(() => {
  const [user, setUser] = useState(userStore.user);
  let userSt = userStore.user;

  useEffect(() => {
    const result = checkUser();
    result.then((data) => setUser(data));
  }, [userSt]);

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/item/:id' element={<ItemPage />} />
        
        <Route element={<ProtectedRouter user={user} />}>
          <Route path='/item/edit/:id' element={<EditGood />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/profile' element={<Profile />} />
          <Route  path='/edit/profile' element={<EditProfile/>}/>
        </Route>
        <Route element={<ProtectedRouter user={!user} />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
})

export default App;
