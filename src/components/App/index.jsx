import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import UserContext from "../../contexts/UserContext"

import { SignIn } from "../SignIn"
import {SignUp} from "../SignUp"
import {Transactions} from "../Transactions"

import GlobalStyles from "../../assets/styles/globalStyles"

export function App() {
  const [token, setToken] = useState("")

  return(
    <UserContext.Provider value={{token, setToken}}>
      <Router>
        <GlobalStyles/>
        <Routes>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}