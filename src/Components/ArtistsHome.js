import {useEffect, useState} from "react"
import ArtistCard from "./ArtistCard"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
function ArtistsHome(){
    const [vis, setVis]=useState(false)
    const [artists, setArtists]=useState([])
    const [formData, setFormData] = useState({
        "image": "",
        "name": ""
      })

    useEffect(() =>{
        fetch("http://127.0.0.1:3000/artists")
        .then(r=>r.json())
        .then(setArtists)
    },[])

    function handleSubmit(e){
        e.preventDefault();
        fetch("http://127.0.0.1:3000/artists", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(r=>r.json())
        .then(data => setArtists([...artists, data]))
        .then(setVis(!vis))
    }

    function handleChange(e){
        const {name, value} =  e.target
        setFormData({...formData, [name]: value})
    }


    const artistCards = artists ? artists.map(artist => {
        return(<ArtistCard key={artist.id} artist={artist}/>)
    }) : null

    return (<>
    <div style={{textAlign: "center", justifyContent: "center"}}>
    <h1>Artists</h1>
    <Button onClick={()=>setVis(!vis)} variant="outline-success"style={{alignItems: "middle"}}>Create New</Button>
    </div>
    {vis ?
    <Form onSubmit={(e)=>handleSubmit(e)} style={{textAlign: "center", justifyContent: "center", margin: "10px"}}>
    <Form.Control onChange={(e)=>handleChange(e)} name="name" type="text" placeholder="Artist Name" />
    <Form.Control onChange={(e)=>handleChange(e)} name="image" type="text" placeholder="Artist Picture" />
    <Button type="submit">Add Artist</Button>
    </Form>
    : null}
    {artistCards}
    </>)
}
export default ArtistsHome