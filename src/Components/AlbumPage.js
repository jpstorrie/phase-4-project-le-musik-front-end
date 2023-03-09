import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function AlbumPage(){
  const params = useParams();
  const navigate = useNavigate();

    const [album, setAlbum] = useState([])
    const [trackFormVis, setTrackFormVis] = useState(false)
    const [albumFormVis, setAlbumFormVis] = useState(false)
    const [formData, setFormData] = useState({
      // FIXME: make sure this includes the artist associated with the track
      "track": "",
      "title": "",
      "duration": "",
      "album_id": params.id,
    })
    console.log(formData)

    useEffect(() => {
    fetch(`http://127.0.0.1:3000/albums/${params.id}`)
        .then((r) => r.json())
        .then(setAlbum);
    }, [params.id]);



    function handleChange(e) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    function handleUpdate(e){
      console.log(e)
    }

    function handleTrackSubmit(e) {
      e.preventDefault();
      fetch("http://127.0.0.1:3000/songs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(r=>r.json())
      // .then(data=>setFormData(FIXME: this needs to reset to the original form data)
    }

    function handleDelete(){
      fetch(`http://127.0.0.1:3000/albums/${params.id}`, {
        method: "DELETE"
      })
      .then(navigate("/albums"))
    }

    const trackMap = album.tracks ? album.tracks.map((track) =>{
        return(<ListGroup.Item className="">{track.track} | {track.title} {track.length} <div className="text-muted" style={{float: "right"}}>{track.duration}</div></ListGroup.Item>)
    }) : null;

    console.log(album.tracks)
    return(
    <div style={{margin: "10px", display: "flex"}}>
    <Card style={{display: "flex", float: "left"}}>
        <Card.Body>
        <Card.Img style={{height: "200px", width: "200px"}} src={`/album/${album.image}`}/>
        <Card.Subtitle className="mb-2" style={{paddingTop: "8px"}}>{album.title}</Card.Subtitle>
        <Card.Subtitle className="mb-2" style={{paddingTop: "1px"}}>{album.artist}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted" style={{padding:"3px"}}>{album.year}</Card.Subtitle>
        <Button variant="outline-info">UPDATE</Button>{' '}
        <Button variant="danger">DELETE</Button>{' '}
        </Card.Body>
    </Card>
    <Card style={{ width: '25rem' }}>
      <ListGroup variant="flush">
        {trackMap}
      </ListGroup>
      <Button onClick={()=> setTrackFormVis(!trackFormVis)} variant="outline-primary">New Track</Button>
    </Card>

    {albumFormVis ?
    <div style={{padding: "10px"}}>
    <h1>Update Album</h1>
    <Form.Control onChange={(e)=>handleChange(e)} name="name" type="text" placeholder="Artist Name" />
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Default file input example</Form.Label>
      <Form.Control type="file" />
    </Form.Group>
    <Button onClick={(e)=>handleUpdate(e)}>Update Album</Button>
    </div>
    : null}

    {trackFormVis ?
    <div style={{padding: "10px"}}>
    <h1>New Track</h1>
    <Form.Control onChange={(e)=>handleChange(e)} name="track" type="integer" placeholder="Track Number" />
    <Form.Control onChange={(e)=>handleChange(e)} name="title" type="text" placeholder="Title" />
    <Form.Control onChange={(e)=>handleChange(e)} name="duration" type="text" placeholder="Duration" />
    <Button onClick={(e)=>handleTrackSubmit(e)}>Add Song</Button>
    </div>
    : null}

    </div>
    )
}
export default AlbumPage