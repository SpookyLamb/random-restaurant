import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const row_classes = "d-flex justify-content-center text-center"

async function GetMenuItems() {
    axios.get("https://www.jsonkeeper.com/b/MDXW")
        .then(function (response) {
            // handle success
            console.log(response.data);
            return response.data; //our array of objects
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
            console.log("Executed Axios API Request!")
        });
}

function Category(props) {
    const cat_name = props.category

    return (
        <Row className={row_classes}>
            <h2>{cat_name}</h2>
        </Row>
    )
}

function Item(props) {
    const name = props.name
    const type = props.type
    const price = props.price
    const description = props.description

    return (
        <Row className={row_classes}>
            <Col>
                <Row className={row_classes}>
                    {name} - {type} . . . {price}
                </Row>
                <Row className={row_classes}>
                    {description}
                </Row>
            </Col>
        </Row>
    )
}

function RestMenu() {
    //needs to construct the menu dynamically from the API call

    function processItems() {
        const ourMenu = GetMenuItems()
        let menuItems = []

        for (let i = 0; i < ourMenu.length; i++) {
            menuItems.push(
                <Item name="Food" type="American" price="$1.00" description="Made with pure human souls!"></Item>
            )
        }
        return menuItems
    }

    return (
        <Container className="p-4">
            <Col className="col-8 mx-auto border p-3">
                <Category category="CATEGORY"/>
                {processItems().map((new_item) => {
                    return new_item
                })}
            </Col>
        </Container>
    )
}

export default RestMenu