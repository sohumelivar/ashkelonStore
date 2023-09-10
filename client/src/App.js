import './App.css';
import SignUp from './components/Autofication/SignUp';
import MainPage from './components/MainPage/MPage';
import UserStore  from './store/userStore';
import {BrowserRouter,Routes,Route} from "react-router-dom"

const userStore = new UserStore()

function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path='/' element={<MainPage/>}/> 
    <Route path='/signup' element={<SignUp/>}/> 

  </Routes>
</BrowserRouter>
  );
}

export default App;
