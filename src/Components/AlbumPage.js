import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function AlbumPage(){
    const [album, setAlbum] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    fetch(`/albums/${params.id}`)
        .then((r) => r.json())
        .then(setAlbum);
    }, [params.id]);

    const trackMap = album.tracks ? album.tracks.map((track) =>{
        return(<ListGroup.Item>{track.track} | {track.title}</ListGroup.Item>)
    }) : null;


    console.log(album.tracks)
    return(
    <>
    <Card>
        <Card.Body style={{display: "flex", float: "left"}}>
        <Card.Img style={{height: "200px", width: "200px"}} src={`/album/${album.image}`}/>
        <Card.Subtitle className="mb-2 text-muted" style={{float: "bottom"}}>{album.year}</Card.Subtitle>
        </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        {trackMap}
      </ListGroup>
    </Card>
    </>
    )
}
export default AlbumPage