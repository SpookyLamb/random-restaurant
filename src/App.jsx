import { Link } from "react-router-dom"
import InfoBox from "./InfoBox"
import RestMenu from "./RestMenu"
import Dropdown from "react-bootstrap/Dropdown"
import Col from 'react-bootstrap/Col'

const Title = () => {
  return (
    <h1 className="text-center">
      The Summer Demon's Diabolical Confections
    </h1>
  )
}

function Filter() {
  //(category, cuisine, price, spice, time of day)
  //className="mx-auto"

  return (
    <Col className="mx-auto d-flex justify-content-center">
        <Dropdown>
          <Dropdown.Toggle>
            Filter
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item>Appetizers</Dropdown.Item>
            <Dropdown.Item>Breakfast</Dropdown.Item>
            <Dropdown.Item>Lunch</Dropdown.Item>
            <Dropdown.Item>Dinner</Dropdown.Item>
            <Dropdown.Item>Drinks</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </Col>
  )
}

function App() {
  return (
    <div className="p-1">
      <Title />
      <InfoBox />
      <Filter />
      <RestMenu />
    </div>
  )
}


export default App
