import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function AlbumPage(){
  const {id} = useParams();
  const navigate = useNavigate();

    const [album, setAlbum] = useState([])
    const [trackFormVis, setTrackFormVis] = useState(false)

    useEffect(() => {
      fetch(`http://127.0.0.1:3000/albums/${id}`)
      .then((r) => r.json())
      .then(setAlbum)
    }, [id]);

    const [formData, setFormData] = useState({
      "track": "",
      "title": "",
      "duration": "",
      "album_id": id,
      "artist_id": album.artist_id
    })


    function handleChange(e) {
      const { name, value } = e.target;
      setFormData({ ...formData, artist_id: album.artist_id, [name]: value });
    }

    function handleTrackSubmit(e) {
      e.preventDefault();
      fetch("http://127.0.0.1:3000/tracks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(r=>r.json())
      .then(data=>{
        console.log([...album.tracks, data])
        setAlbum([...album.tracks, data])
        setFormData({
        "track": "",
        "title": "",
        "duration": "",
        "album_id": id,
        "artist_id": album.artist_id,
      })})
    }

    function handleDelete(){
      fetch(`http://127.0.0.1:3000/albums/${id}`, {
        method: "DELETE"
      })
      .then(navigate("/albums"))
    }

    const trackMap = album.tracks ? album.tracks.map((track) =>{
        return(<ListGroup.Item key={track.id} className="">{track.track} | {track.title} {track.length} <div className="text-muted" style={{float: "right"}}>{track.duration}</div></ListGroup.Item>)
    }) : null;

    let imgPath = album.image
    if (/^https?:/.test(album.image)) {
      imgPath = album.image;
      } else {
      imgPath = `/album/${album.image}`
      }

    return(
    <div style={{margin: "10px", display: "flex"}}>
    <Card style={{display: "flex", float: "left"}}>
        <Card.Body>
        <Card.Img style={{height: "200px", width: "200px"}} src={imgPath} />
        <Card.Subtitle className="mb-2" style={{paddingTop: "8px"}}>{album.title}</Card.Subtitle>
        <Card.Subtitle className="mb-2" style={{paddingTop: "1px"}}>{album.artist}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted" style={{padding:"3px"}}>{album.year}</Card.Subtitle>
        <Button onClick={handleDelete} variant="danger">DELETE</Button>{' '}
        </Card.Body>
    </Card>
    <Card style={{ width: '25rem' }}>
      <ListGroup variant="flush">
        {trackMap}
      </ListGroup>
      <Button onClick={()=> setTrackFormVis(!trackFormVis)} variant="outline-primary">New Track</Button>
    </Card>

    {trackFormVis ?
    <div style={{padding: "10px"}}>
    <h1>New Track</h1>
    <Form onSubmit={(e)=>handleTrackSubmit(e)}>
    <Form.Control onChange={(e)=>handleChange(e)} name="track" type="integer" placeholder="Track Number" />
    <Form.Control onChange={(e)=>handleChange(e)} name="title" type="text" placeholder="Title" />
    <Form.Control onChange={(e)=>handleChange(e)} name="duration" type="text" placeholder="Duration" />
    <Button type="submit">Add Song</Button>
    </Form>
    </div>
    : null}

    </div>
    )
}
export default AlbumPage