import './App.css';
import LogIn from './components/Autofication/LogIn';
import SignUp from './components/Autofication/SignUp';
import MainPage from './components/MainPage/MPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/NavBar/Header';
import Profile from './components/Profile/Profile';
import ItemPage from './components/ItemPage/ItemPage';
import EditGood from './components/Goods/editGoods/EditGoods';


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<LogIn />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/item/:id' element={<ItemPage />} />
        <Route path='item/edit/:id' element={<EditGood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
