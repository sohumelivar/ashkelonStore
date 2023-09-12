import './App.css';
import LogIn from './components/Autofication/LogIn';
import SignUp from './components/Autofication/SignUp';
import MainPage from './components/MainPage/MPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/NavBar/Header';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<LogIn />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
