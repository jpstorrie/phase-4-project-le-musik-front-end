import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function ArtistPage(){
    const params = useParams()
    const navigate = useNavigate()
    const [artistFormVis, setArtistFormVis] = useState(false)
    const [artist, setArtist] = useState([])
    const [formData, setFormData] = useState({"name": "", "image": "",})
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/artists/${params.id}`)
            .then((r) => r.json())
            .then(setArtist);
        }, [params.id]);

    let imgPath = artist.image
    if (/^https?:/.test(artist.image)) {
      imgPath = artist.image;
      } else {
      imgPath = `/artist/${artist.image}`
      }


    function handleDelete(){
        fetch(`http://127.0.0.1:3000/artists/${params.id}`, {
            method: "DELETE"
        })
        .then(navigate("/artists"))
    }

    function handleUpdate(e){
        // e.preventDefault();
        fetch(`http://127.0.0.1:3000/artists/${params.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(r=> {if(r.ok){
        r.json()
        .then(setArtist)
        .then(setFormData({"name": "", "image": ""}))
        .then(setArtistFormVis(!artistFormVis))
        }
        else{
            r.json()
            .then(error => setErrors(error.error))
        }
    })}

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const artistsAlbums = artist.albums? artist.albums.map((album)=> {return(<AlbumCard album={album}/>)}):null;

    const renderErrors = errors? errors.map((error)=> {return(<h1>{error.error}</h1>)}):null;

    return (<div style={{margin: "10px", display: "flex"}}>

        {errors ? renderErrors : null}
    <Card style={{display: "flex", float: "left"}}>
        <Card.Body>
        <Card.Img style={{height: "400px", width: "400px"}} src={imgPath} />
        <Card.Title className="mb-2" style={{padding: "10px"}}>{artist.name}</Card.Title>
        <Button onClick={()=>setArtistFormVis(!artistFormVis)} variant="outline-info">UPDATE</Button>{' '}
        <Button onClick={handleDelete} variant="danger">DELETE</Button>{' '}
        </Card.Body>
    </Card>
    <div>
    <h1>Albums:</h1>
    {artistsAlbums}
    </div>

    {artistFormVis ?
    <div style={{padding: "10px"}}>
    <h1>Update Artist</h1>
    <Form.Control onChange={(e)=>handleChange(e)} name="name" type="text" placeholder="Artist Name"/>
    <Form.Control onChange={(e)=>handleChange(e)} name="image" type="text" placeholder="Artist Image Link" />
    <Button onClick={(e)=>handleUpdate(e)}>Update Artist</Button>
    </div>
    : null}
    </div>)
}
export default ArtistPage