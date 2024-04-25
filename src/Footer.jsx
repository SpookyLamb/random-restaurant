import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  const row_classes = "d-flex justify-content-center text-center p-1"

  return (
    <Container className="border pt-1">
      <Row className={row_classes}>
        THE SUMMER DEMON
      </Row>
      <Row className={row_classes}>
        348 E Main Street, Lexington, KY, 40508
      </Row>
      <Row className={row_classes}>
        Our Demonic Confections are available for Takeout, Pickup, or Dine-In!
      </Row>
      <Row className={row_classes}>
        Sundays, June - August, 6 AM - 6 PM
      </Row>
    </Container>
  )
}

export default Footer