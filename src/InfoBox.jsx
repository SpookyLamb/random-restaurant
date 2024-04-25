import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InfoBox() {
    const row_classes = "d-flex justify-content-center text-center"
    const shadow_rows = row_classes + " shadows"

    return (
        <Container className="pb-4">
            <Col className="col-12 col-lg-8 mx-auto border p-3">
                <Row className={row_classes + " rubik-mono"}>
                    <h1>OUR MENU</h1>
                </Row>
                <Row className={shadow_rows}>The Summer Demon</Row>
                <Row className={shadow_rows}>348 E Main Street, Lexington, KY</Row>
                <Row className={shadow_rows}>(859) 666-6666</Row>
                <Row className={shadow_rows}>Sundays, June - August, 6 AM - 6 PM</Row>
            </Col>
        </Container>
    )
}

export default InfoBox
