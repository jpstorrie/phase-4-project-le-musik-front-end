import {useEffect, useState} from "react"
import AlbumCard from "./AlbumCard"

function Home(){

    const [albums, setAlbums]=useState([])

    // const user = {
    //     username: "nick",
    //     password: "password"
    // }

    // const loginObj = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(user)
    // }


    // fetch('/login', loginObj)
    // .then(r => r.json())
    // .then(data => console.log(data))

    useEffect(() =>{
        fetch("/albums")
        .then(r=>r.json())
        .then(setAlbums)
    },[])

    console.log(albums)
    const albumCards = albums.map(album => {
        return(<AlbumCard key={album.id} album={album}/>)
    })

    return (<>
    <h1 style={{textAlign: "center"}}>Albums</h1>
    {albumCards}
    </>)
}
export default Home