import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Styles from "../CarouselProducts/CarouselProducts.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsForProduct } from '../../redux/slice/ratingReviewSlice';

const CommentsUsers = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const productId = "MLAC39340374294"

  useEffect(() => {
    dispatch(getAllReviewsForProduct(productId));
  }, [dispatch])

  return (
    <div >
      <div className={Styles.centerContainer}>

      </div>
      <Container>
        <Row>
          <Col xs={{ span: 12, offset: 4 }} md={6} className='mb-3'>
            <Carousel data-bs-theme="dark" indicators={false} controls={false}>
              <Carousel.Item>
                <Container>
                  <Row>
                    <Col xs={12} md={10}>
                      <CardGroup>
                        <Card>
                          <Card.Img variant="top" src="/images/flag_of_Colombiaok.png" width={300} height={300} />
                          <Card.Body>
                            <Card.Title>Comentarios de los clientes</Card.Title>
                            <Card.Text>
                              {reviews && `${reviews[0]?.username}: ${reviews[0]?.review_description}`}
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
                          <Card.Img variant="top" src="/images/flag_of_Argentina.jpg" width={300} height={300} />
                          <Card.Body>
                            <Card.Title>Comentarios de los clientes</Card.Title>
                            <Card.Text>
                              {reviews && `${reviews[1]?.username}: ${reviews[1]?.review_description}`}
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
                            <Card.Title>Comentarios de los clientes</Card.Title>
                            <Card.Text>
                              {reviews && `${reviews[2]?.username}: ${reviews[2]?.review_description}`}
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