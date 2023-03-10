import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import {useNavigate} from "react-router-dom"

function ArtistCard({artist}){
    const navigate = useNavigate()


    let imgPath = artist.image
    if (/^https?:/.test(artist.image)) {
    imgPath = artist.image;
    } else {
    imgPath = `/artist/${artist.image}`
    }

    return (
    <div>
    
    <Card onClick={()=>navigate(`/artists/${artist.id}`)} style={{ width: '18rem', display: "flex", float: "Left", margin: "5px"}}>
      <Card.Img variant="top" src={imgPath} />
      <Card.Body>
        <Card.Title>{artist.name}</Card.Title>
      </Card.Body>
    </Card>
    </div>
    )
}
export default ArtistCard