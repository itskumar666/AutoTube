import { useState } from 'react'
import './App.css'
import {SideBar }from './Components/SideBAr'
import { Videos } from './Components/Videos'
import Signup from './Components/Signup';
import {MainPage} from './Components/MainPage'
import {BrowserRouter,Routes,Route} from'react-router-dom'
import { Upload } from './Components/Upload';
import { Login } from './Components/Login';
import { Account } from './Components/Account';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div>
     <BrowserRouter>
     <Routes>
      <Route path={'/'} element={<Signup/>}> </Route>
      <Route path={'/login'} element={<Login/>}> </Route>
      <Route path={'/Mainpage'} element={<MainPage/>}></Route>
      <Route path={'/Videos'} element={<Videos/>}></Route>
      <Route path={'/Upload'} element={<Upload/>}></Route>
      <Route path={'/Account'} element={<Account/>}></Route>
     </Routes>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
