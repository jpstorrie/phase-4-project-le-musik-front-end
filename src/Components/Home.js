import {useEffect, useState} from "react"
import AlbumCard from "./AlbumCard"

function Home(){

    const [albums, setAlbums]=useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:3000/albums")
        .then(r=>r.json())
        .then(setAlbums)
    },[])

    console.log(albums)
    const albumCards = albums ? albums.map(album => {
        return(<AlbumCard key={album.id} album={album}/>)
    }) : null

    return (<>
    <h1 style={{textAlign: "center"}}>Albums</h1>
    {albumCards}
    </>)
}
export default Home