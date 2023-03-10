import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './Components/Navbar'
import Home from './Components/Home'
import AlbumPage from './Components/AlbumPage'
import ArtistsHome from './Components/ArtistsHome'
import ArtistPage from './Components/ArtistPage'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null)

  // useEffect(() =>{
  //   fetch("http://127.0.0.1:3000/authorized")
  //   .then(r => {
  //     if(r.ok){r.json().then(user=> setUser(user))}
  //     else {setUser(null)}
  //   })
  //   },[])

    const updateUser = (user =>setUser(user))
      return (
        <div className="App">
      <Router>
        <NavBar updateUser={updateUser}/>

        <Routes>
          <Route exact path="/albums" element={<Home />} />
          <Route exact path="/albums/:id" element={<AlbumPage />} />
          <Route exact path="/artists" element={<ArtistsHome />} />
          <Route exact path="/artists/:id" element={<ArtistPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
