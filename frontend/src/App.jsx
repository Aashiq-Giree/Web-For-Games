import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AllGames from './pages/AllGames'
import ViewGameDetails from './components/ViewGameDetails/ViewGameDetails'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourite from './components/Profile/Favourite'
import Settings from './components/Profile/Settings'
import AddGames from './pages/AddGames'
import UpdateGame from './pages/UpdateGame'
import GamePlayer from './components/GamePlayer/GamePlayer'
import AllUsers from './components/AllUsers/AllUsers'
import { TimeProvider } from './components/TimeSpend/TimeProvider'

export default function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, []);
  return (
    <div>
      <TimeProvider>


        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/all-games' element={<AllGames />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} >
            {role === "user" ? (
              <Route index element={<Favourite />} />
            ) : (
              <Route index element={<AllUsers />} />
            )}
            {role === "admin" && <Route path='/profile/add-games' element={<AddGames />} />}
            <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route path='/view-game-details/:id' element={<ViewGameDetails />} />
          <Route path='/update-game/:id' element={<UpdateGame />} />
          <Route path='/play-game/:id' element={<GamePlayer />} />
        </Routes>
        <Footer />
      </TimeProvider>
    </div>
  )
}
