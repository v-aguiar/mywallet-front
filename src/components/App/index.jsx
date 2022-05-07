import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import UserContext from "../../contexts/UserContext"

import { SignIn } from "../SignIn"
import {SignUp} from "../SignUp"

import GlobalStyles from "../../assets/styles/globalStyles"

export function App() {
  return(
    <UserContext.Provider>
      <Router>
        <GlobalStyles/>
        <Routes>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}