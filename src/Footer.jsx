import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  const row_classes = "d-flex justify-content-center text-center"
  const shadow_rows = row_classes + " shadows"

  return (
    <Container className="border pt-1 pb-3">
      <Row className={row_classes + " rubik-mono p-2"}>
        THE SUMMER DEMON
      </Row>
      <Row className={shadow_rows}>
        348 E Main Street, Lexington, KY, 40508
      </Row>
      <Row className={shadow_rows}>
        Our Demonic Confections are available for <br/>Takeout, Pickup, or Dine-In!
      </Row>
      <Row className={shadow_rows}>
        Hours are Sundays, June - August, 6 AM - 6 PM
      </Row>
      <Row className={shadow_rows}>
        Contact us via phone at (859) 666-6666, or email us at thesummerdemon@hotsingledevils.com
      </Row>
    </Container>
  )
}

export default Footer