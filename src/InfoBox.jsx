import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InfoBox() {
    const row_classes = "d-flex justify-content-center text-center"

    return (
        <Container className="p-4">
            <Col className="col-8 mx-auto border p-3">
                <Row className={row_classes}>
                    <h1>MENU</h1>
                </Row>
                <Row className={row_classes}>The Summer Demon</Row>
                <Row className={row_classes}>348 E Main Street, Lexington, KY</Row>
                <Row className={row_classes}>(859) 555-5555</Row>
                <Row className={row_classes}>Monday - Friday, 8 AM - 4 PM</Row>
            </Col>
        </Container>
    )
}

export default InfoBox
