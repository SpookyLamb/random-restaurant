import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import { Image } from 'react-bootstrap';

const row_classes = "d-flex justify-content-center text-center"

function Category(props) {
    const cat_name = props.category

    return (
        <Row className={row_classes + " rubik-mono pt-3 pb-1"}>
            <h2>{cat_name}</h2>
        </Row>
    )
}

function Item(props) {
    const name = props.name
    const image_path = props.imagepath
    const price = props.price
    const description = props.description

    const item_classes = row_classes + " p-2"

    return (
        <Row className={item_classes}>
            <Col>
                <Row className={row_classes + " rubik-mono"}>
                    <Col className="col-6 col-lg-12">
                        <Row className={row_classes + " pb-2"}> <strong>{name}</strong> </Row>
                        <Row className={row_classes + " pb-2 fs-4"}> ${price} </Row>
                    </Col>
                    <Col className="col-6 col-lg-12 d-flex justify-content-center">
                        <Image className="food-image border" src={image_path} />
                    </Col>
                </Row>
                <Row className={row_classes + " shadows pt-4 pb-3"}>
                    <Col className="col-12 col-lg-8 fs-5">
                        {description}
                    </Col> 
                </Row>
            </Col>
        </Row>
    )
}

function CatandItems(props) {
    //takes a category name and a list (array) of items and spits out a Category and multiple Item elements

    const category = props.category.toUpperCase()
    const items = props.items

    return (
        <>
            <Category category={category} />
            {items.map((new_item) => {
                return new_item
            })}
        </>
    )
}

function RestMenu(props) {
    //needs to construct the menu dynamically from the API call

    const filter = props.filter.toLowerCase()

    let [menuItems, setItems] = useState([])

    let [breakfastItems, setBreakfast] = useState([])
    let [appetizerItems, setAppetizers] = useState([])
    let [lunchItems, setLunch] = useState([])
    let [dinnerItems, setDinner] = useState([])
    let [drinkItems, setDrinks] = useState([])

    function GetMenuItems() {
        axios.get("https://raw.githubusercontent.com/SpookyLamb/food-list/main/confections.json")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setItems(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function processItems() {
        let newItems

        let breakfast = []
        let appetizers = []
        let lunch = []
        let dinner = []
        let drinks = []

        for (let i = 0; i < menuItems.length; i++) {
            const name = menuItems[i].title
            //const type = menuItems[i].cuisine_type
            const price = menuItems[i].price
            const description = menuItems[i].description
            const category = menuItems[i].category
            const imagepath = menuItems[i].imagepath

            switch (category) {
                case "Cookie":
                    newItems = appetizers
                    break;
                case "Cake":
                    newItems = breakfast
                    break;
                case "Doughnut":
                    newItems = lunch
                    break;
                case "Pastry":
                    newItems = dinner
                    break;
                case "Drink":
                    newItems = drinks
                    break;
            }

            newItems.push(
                <Item name={name} price={price} description={description} imagepath={imagepath}></Item>
            )
        }

        setAppetizers(appetizers)
        setBreakfast(breakfast)
        setDinner(dinner)
        setDrinks(drinks)
        setLunch(lunch)
    }

    useEffect((() => {
        GetMenuItems()
    }), [])

    useEffect((() => {
        processItems()
    }), [menuItems])

    function getItemSet() {
        console.log("Getting item set.")

        let filtered_items = []

        switch (filter) {
            case "cookies":
                filtered_items = appetizerItems
                break;
            case "cakes":
                filtered_items = breakfastItems
                break;
            case "doughnuts":
                filtered_items = lunchItems
                break;
            case "pastries":
                filtered_items = dinnerItems
                break;
            case "drinks":
                filtered_items = drinkItems
                break;
        }

        return <CatandItems category={filter} items={filtered_items}/>
    }

    if (filter) {
        return (
            <Container className="p-4">
                <Col className="col-12 col-lg-8 mx-auto border p-3">
                    {getItemSet()}
                </Col>
            </Container>
        )
    } else {
        return (
            <Container className="p-4">
                <Col className="col-12 col-lg-8 mx-auto border p-3">
                    <Category category="COOKIES"/>
                    {appetizerItems.map((new_item) => {
                        return new_item
                    })}
                    <Category category="CAKES"/>
                    {breakfastItems.map((new_item) => {
                        return new_item
                    })}
                    <Category category="DOUGHNUTS"/>
                    {lunchItems.map((new_item) => {
                        return new_item
                    })}
                    <Category category="PASTRIES"/>
                    {dinnerItems.map((new_item) => {
                        return new_item
                    })}
                    <Category category="DRINKS"/>
                    {drinkItems.map((new_item) => {
                        return new_item
                    })}
                </Col>
            </Container>
        )
    }
}

export default RestMenu