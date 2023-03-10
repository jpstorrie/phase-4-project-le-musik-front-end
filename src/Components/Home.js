import {useEffect, useState} from "react"
import AlbumCard from "./AlbumCard"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Home(){
    const [vis, setVis]=useState(false)
    const [albums, setAlbums]=useState([])
    const [formData, setFormData] = useState({
        "image": "",
        "title": "",
        "year": ""
      })
    useEffect(() =>{

        fetch("http://127.0.0.1:3000/albums")
        .then(r=>r.json())
        .then(setAlbums)
    },[])

    function handleSubmit(e){
        e.preventDefault();
        fetch("http://127.0.0.1:3000/albums", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(r=>r.json())
        .then(data=>setAlbums([...albums, data]));
    }

    function handleChange(e){
        const {name, value} =  e.target
        setFormData({...formData, [name]: value})
    }

    const albumCards = albums ? albums.map(album => {
        return(<AlbumCard key={album.id} album={album}/>)
    }) : null

    return (<>
    <div style={{textAlign: "center", justifyContent: "center", margin: "10px"}}>
    <h1>Albums</h1>
    <Button onClick={()=>setVis(!vis)} variant="outline-success"style={{alignItems: "middle"}}>Create New</Button>
    {vis ?
    <Form onSubmit={(e)=>handleSubmit(e)} style={{textAlign: "center", justifyContent: "center", margin: "10px"}}>
    <Form.Control onChange={(e)=>handleChange(e)} name="image" type="text" placeholder="Album Cover" />
    <Form.Control onChange={(e)=>handleChange(e)} name="title" type="text" placeholder="Album Name" />
    <Form.Control onChange={(e)=>handleChange(e)} name="year" type="text" placeholder="Release Year" />
    <Button type="submit">Add Album</Button>
    </Form>
    : null}
    </div>
    {albumCards}
    </>)
}
export default Home