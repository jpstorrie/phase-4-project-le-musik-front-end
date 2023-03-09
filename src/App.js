import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './Components/Navbar'
import Home from './Components/Home'
import AlbumPage from './Components/AlbumPage'
import SongCard from './Components/SongCard'
import ArtistCard from './Components/ArtistCard'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() =>{
    fetch("http://127.0.0.1:3000/authorized")
    .then(r => {
      if(r.ok){r.json().then(user=> setUser(user))}
      else {setUser(null)}
    })
    },[])

    const updateUser = (user =>setUser(user))

    if(!user){
      return(
      <Router>
      <NavBar updateUser={updateUser}/>
      <Routes>
      <Route exact path="/" element={<Login updateUser={updateUser}/>} />
      </Routes>
      </Router>
      )
    }
    else{
      return (
        <div className="App">
      <Router>
        <NavBar updateUser={updateUser}/>

        <Routes>
          <Route exact path="/albums" element={<Home />} />
          <Route exact path="/albums/:id" element={<AlbumPage />} />
          <Route exact path="/songs/:id" element={<SongCard />} />
          <Route exact path="/artists/:id" element={<ArtistCard />} />
          {/* <Route exact path="/" element={<Login updateUser={updateUser}/>} /> */}
        </Routes>
      </Router>
    </div>
  )
}
}

export default App
