import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import { render } from 'react-dom';

const OrderItem = ({ item_id, name, price, quantities, setQuantities }) => { //props are grabbed when submitting an order, don't touch!
    //takes a list of the full menu, via string titles
    //has a dropdown menu that contains the full menu (needs to be grabbed from the backend on load)
    //and a quantity input field, customer can create arbitrarily large numbers of these via the order form
    const [quantity, setQuantity] = useState(1)

    function adjustQuantities(q) { //takes this item's quantity and then pushes it to the
        let newQuantities = structuredClone(quantities) //get a fresh object we can work on
        newQuantities[item_id] = q
        setQuantities(newQuantities)
    }

    return (
        <Row>
            <Col className='d-flex justify-content-end'>
                <h3 className='rubik-mono'>{name}</h3>
            </Col>
            <Col>
                <input className='order-input' onChange={(e) => {
                    let q = e.target.value
                    if (q > 0) {
                        setQuantity(q)
                        adjustQuantities(q)
                    }
                }} type="number" value={quantity}/>
            </Col>
        </Row>
    )
}

const OrderDropdown = ({ menuItems, orderItems, setOrderItems, quantities, setQuantities }) => {
    //takes menuItems, which is an array of objects, and renders a dropdown element for each of them

    function addOrderItem(eventKey, event) {
        //adds an OrderItem to the parent OrderForm
        let newOrderItems = Array.from(orderItems)

        //grab our id, name, and price from our eventKey, should look like NAME-ID-PRICE
        let array = eventKey.split("-")
        let name = String(array[0])
        let id = Number(array[1])
        let price = Number(array[2])

        newOrderItems.push(<OrderItem item_id={id} name={name} price={price} quantities={quantities} setQuantities={setQuantities}/>)
        setOrderItems(newOrderItems)
    }

    let renderedItems = []

    for (let i = 0; i < menuItems.length; i++) {
        //eventKey is the item's name and ID, divided by a "-"
        let next_item = menuItems[i]
        renderedItems.push(<Dropdown.Item eventKey={ next_item.name + "-" + next_item.id + "-" + next_item.price}>{next_item.name}</Dropdown.Item>)
    }

    return (
        <Dropdown onSelect={addOrderItem}>
            <Dropdown.Toggle className="rubik-mono-white" variant="danger">
                Add New Item
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="rubik-mono">
                {renderedItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}

const OrderForm = ({ customers, setCustomers }) => {
    const [name, setName] = useState('')
    const [orderItems, setOrderItems] = useState([])

    const [menuItems, setMenuItems] = useState([]) //from the database

    const [quantities, setQuantities] = useState({}) //sets a quantity with item IDs as keys
    
    //needs to grab all of the possible food items via axios and then update the dropdown menu to contain all the relevant items
    useEffect(() => {
        getCustomers() //get our customers

        axios.get('http://127.0.0.1:8000/menu_items/') //then get our menu items
            .then(response => {
                console.log("RESPONSE: ", response)
                setMenuItems(response.data)
            })
            .catch(error => console.log("ERROR: ", error))
    }, [])

    function getCustomers() {
        axios.get('http://127.0.0.1:8000/customers/')
        .then(response => {
            console.log("RESPONSE: ", response)
            setCustomers(response.data)
            console.log("CUST ", customers)
        })
        .catch((error) => {console.log("ERROR: ", error); return []})
    }

    function createOrder() {
        //pushes order information to the database, creates a new customer if they do not already exist
        //displays the order beneath the order field, and clears the order field
        //has to grab all the information from the OrderItems, can do this by grabbing the list and calling their internal function

        if (!name) { //no name, no order
            alert("You have to enter a name!")
            return
        }

        if (orderItems.length < 1) { //no food, no order
            alert("You have to select at least one menu item to place your order!")
            return
        }

        //collect our order information: customer, item IDs, quantities, running total price
        //to get the customer, get the previously grabbed list of customers from the database and filter by name
        let customer = name
        let customerID = 0

        for (let i = 0; i < customers.length; i++) { //iterate over our list of objects, grabbing the id of the one with the matching name
            let obj = customers[i]

            if (obj.name === name) {
                customerID = obj.id
                break;
            }
        }

        if (customerID !== 0) { //customer found
            console.log("Customer found!")
        } else { //customer NOT found, needs to add a new one to the db
            console.log("Customer NOT found!")

            axios.post("http://127.0.0.1:8000/customers/", {name: name})
            .then(response => {
                console.log("RESPONSE: ", response)
                if (response.status === 200 || response.status === 201) {
                  getCustomers() //update the list
                  alert("Added customer! Please resubmit your order!") //make the customer try again - NOTE: I know this isn't the best approach. :)
                }
              })
            .catch(error => console.log("ERROR: ", error))
            return  //quit
        }

        let itemIDs = []
        let quantityList = []
        let running_total = 0
        
        for (let i = 0; i < orderItems.length; i++) {
            let orderItem = orderItems[i]

            itemIDs.push( orderItem.props.item_id )
            
            let quantity = Number( quantities[orderItem.props.item_id] )
            
            if (isNaN(quantity)) { //happens if the customer never adjusts the quantity
                quantity = 1
            }

            quantityList.push( quantity )
            running_total += orderItem.props.price * quantity
        }

        running_total = running_total.toFixed(2)

        console.log("ORDER | CustName: ", customer, " IDs: ", itemIDs, " Quantities: ", quantityList, " Total: ", running_total)

        let quantityString = JSON.stringify(quantityList)

        axios.post("http://127.0.0.1:8000/orders/", {
            customer: customerID,
            foods_ordered: itemIDs,
            quantities: quantityString,
            price_total: running_total,
            completed: false,
        })
        .then(response => {
            console.log("RESPONSE: ", response)
            if (response.status === 200 || response.status === 201) {
              alert("Your order has been submitted! Please arrive for pickup in 30 minutes. Your total will be: " + String(running_total))
            }
          })
        .catch(error => console.log("ERROR: ", error))

        //after completing the order, delete all the items
        setOrderItems([])
        setQuantities({})
    }

    return (
        <Container>
            <Col className='col-12 text-center pb-4'>
                <h2 className='rubik-mono'>Create New Order</h2>
                <input onChange={e => setName(e.target.value)} placeholder="Enter Name" value={name} />
            </Col>

            <Col className="mx-auto d-flex justify-content-center">
                <OrderDropdown menuItems={menuItems} orderItems={orderItems} setOrderItems={setOrderItems} quantities={quantities} setQuantities={setQuantities}/>
            </Col>

            <br/>

            <Container>
                {orderItems}
            </Container>

            <br/>

            <Col className='col-12 text-center'>
                <Button className='rubik-mono-white' variant='danger' onClick={() => createOrder()}>
                    Submit Order!
                </Button>
            </Col>
        </Container>
    )
}

function Order() {
    const [customers, setCustomers] = useState([])

    return (
        <Container className="p-4">
            <Col className="col-12 col-lg-8 mx-auto border p-3">
                <OrderForm customers={customers} setCustomers={setCustomers}/>
            </Col>
        </Container>
    )
}

export default Order