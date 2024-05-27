import { useState } from "react";
import "./App.css";
import { Videos } from "./Components/Videos";
import Signup from "./Components/Signup";
import { MainPage } from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Upload } from "./Components/Upload";
import { Login } from "./Components/Login";
// import { Unedited } from "./Components/Unedited";
import { Account } from "./Components/Account";
import { RecoilRoot } from "recoil";
import  EditorEdited  from "./Components/EditorEdited";
import { EditorUnedited } from "./Components/EditorUnedited";
import { EditorUpload } from "./Components/EditorUpload";
import { YoutuberEited } from "./Components/YoutuberEdited";
import { YoutuberUneited } from "./Components/YoutuberUnedited";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Signup />}></Route>
              <Route path={"/login"} element={<Login />}></Route>
              <Route path={"/Mainpage"} element={<MainPage />}></Route>
              <Route path={"/EditorEdited"} element={<EditorEdited />}></Route>
              <Route path={"/EditorUnedited"} element={<EditorUnedited />}></Route>
              <Route path={"/EditorUpload"} element={<EditorUpload />}></Route>
              <Route path={"/YoutuberEdited"} element={<YoutuberEited/>}></Route>
              <Route path={"/YoutuberUnedited"} element={<YoutuberUneited />}></Route>
              <Route path={"/Upload"} element={<Upload />}></Route>
              <Route path={"/Account"} element={<Account />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
