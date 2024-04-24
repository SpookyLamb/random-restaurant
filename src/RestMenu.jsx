import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';

const row_classes = "d-flex justify-content-center text-center"

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

    const item_classes = row_classes + " p-3"

    return (
        <Row className={item_classes}>
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

    let [menuItems, setItems] = useState([])
    let [processedItems, setProcessedItems] = useState([])

    function GetMenuItems() {
        axios.get("https://www.jsonkeeper.com/b/MDXW")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setItems(response.data);
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

    function processItems() {
        let newItems = []

        for (let i = 0; i < menuItems.length; i++) {
            const name = menuItems[i].title
            const type = menuItems[i].cuisine_type
            const price = menuItems[i].price
            const description = menuItems[i].description

            newItems.push(
                <Item name={name} type={type} price={price} description={description}></Item>
            )
        }

        setProcessedItems(newItems)
    }

    useEffect((() => {
        GetMenuItems()
    }), [])

    useEffect((() => {
        processItems()
    }), [menuItems])

    return (
        <Container className="p-4">
            <Col className="col-8 mx-auto border p-3">
                <Category category="CATEGORY"/>
                {processedItems.map((new_item) => {
                    return new_item
                })}
            </Col>
        </Container>
    )
}

export default RestMenu