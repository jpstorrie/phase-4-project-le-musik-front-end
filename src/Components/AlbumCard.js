import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import {useNavigate} from "react-router-dom"

function AlbumCard({album}){
    const navigate = useNavigate()

    let imgPath = album.image
    if (/^https?:/.test(album.image)) {
      imgPath = album.image;
      } else {
      imgPath = `/album/${album.image}`
      }

    return (
    <div>
    <Card onClick={()=>navigate(`/albums/${album.id}`)} style={{ width: '18rem', display: "flex", float: "Left", margin: "5px"}}>
      <Card.Img variant="top" src={imgPath} />
      <Card.Body>
        <Card.Title>{album.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Released: {album.year}</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>
 )
}
export default AlbumCard