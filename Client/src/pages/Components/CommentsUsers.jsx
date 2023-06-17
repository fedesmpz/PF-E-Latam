import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CommentsUsers = () => {
  return (
    <div>
    <Container>
        <Row>
        <Col xs={12} md={6}>
        
        <Carousel data-bs-theme="dark">
      <Carousel.Item>
      <Container>
      <Row>
      <Col xs={12} md={10}>
      <CardGroup>
      <Card>
        <Card.Img variant="top" src="/images/flag_of_Colombiaok.png" width={300} height={300}/>
        <Card.Body>
          <Card.Title>Comentarios de los clientes</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>

      </CardGroup>
      </Col>
      </Row>
      </Container>
      </Carousel.Item>

      <Carousel.Item>
      <Container>
      <Row>
      <Col xs={12} md={10}>
      <CardGroup>
      <Card>
        <Card.Img variant="top" src="/images/flag_of_Argentina.jpg" width={300} height={300}/>
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>

      </CardGroup>
      </Col>
      </Row>
      </Container>
      </Carousel.Item>

      <Carousel.Item>
      <Container>
      <Row>
      <Col xs={12} md={10}>
      <CardGroup>
      <Card>
        <Card.Img variant="top" src="/images/flag_of_Mexico.jpg" width={300} height={300} />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>

      </CardGroup>
      </Col>
      </Row>
      </Container>
      </Carousel.Item>

    </Carousel>
        </Col>
        </Row>
    </Container>
    </div>
  );
}

export default CommentsUsers;