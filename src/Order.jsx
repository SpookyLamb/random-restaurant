import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown"

import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';

const OrderItem = ({}) => {
    //takes a list of the full menu, via string titles
    //has a dropdown menu that contains the full menu (needs to be grabbed from the backend on load)
    //and a quantity input field, customer can create arbitrarily large numbers of these via the order form
    const [quantity, setQuantity] = useState(0)

    function getQuantity() {
        return quantity
    }

    return (
        <Row>
            <Col>
                ITEM
            </Col>
            <Col>
                <input onChange={e => setQuantity(e.target.value)} type="number" value={quantity}/>
            </Col>
        </Row>
    )
}

const OrderForm = ({}) => {
    const [name, setName] = useState('')
    const [orderItems, setOrderItems] = useState([])

    function addOrderItem() {
        //adds an OrderItem to the OrderForm
        let newOrderItems = Array.from(orderItems)
        newOrderItems.push(<OrderItem/>)
        setOrderItems(newOrderItems)
    }

    function createOrder() {
        //pushes order information to the database, creates a new customer if they do not already exist
        //displays the order beneath the order field, and clears the order field
        //has to grab all the information from the OrderItems, can do this by grabbing the list and calling their internal function
    }

    return (
        <div>
            <h2>Create New Order</h2>
            <input onChange={e => setName(e.target.value)} placeholder="Enter Name" value={name} />

            <br/>

            {/* <button onClick={() => addOrderItem()}>
                Add Item!
            </button> */}

            <Col className="mx-auto d-flex justify-content-center">
                <Dropdown onSelect={() => {addOrderItem()}}>
                    <Dropdown.Toggle className="rubik-mono-white" variant="danger">
                        Add New Item
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className="rubik-mono">
                        <Dropdown.Item eventKey="">None</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>

            <br/>

            <Container>
                {orderItems}
            </Container>

            <br/>

            <button onClick={() => createOrder()}>
                Submit Order!
            </button>
        </div>
    )
}

function Order() {
  return (
    <Container className="p-4">
        <Col className="col-12 col-lg-8 mx-auto border p-3">
            <OrderForm/>
        </Col>
    </Container>
  )
}

export default Order