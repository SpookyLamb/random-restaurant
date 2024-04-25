import { Link } from "react-router-dom"
import InfoBox from "./InfoBox"
import RestMenu from "./RestMenu"
import Dropdown from "react-bootstrap/Dropdown"
import Col from 'react-bootstrap/Col'
import { useState } from "react"

const Title = () => {
  return (
    <h1 className="text-center p-3">
      The Summer Demon's Diabolical Confections
    </h1>
  )
}

function App() {
  let [filter, setFilter] = useState("")

  function onFilterSelected(eventKey, event) {
    console.log(event)
    setFilter(eventKey)
  }
  
  function Filter() {
    //(category, cuisine, price, spice, time of day)
  
    return (
      <Col className="mx-auto d-flex justify-content-center">
          <Dropdown onSelect={onFilterSelected}>
            <Dropdown.Toggle>
              Filter
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">None</Dropdown.Item>
              <Dropdown.Item eventKey="appetizers">Appetizers</Dropdown.Item>
              <Dropdown.Item eventKey="breakfast">Breakfast</Dropdown.Item>
              <Dropdown.Item eventKey="lunch">Lunch</Dropdown.Item>
              <Dropdown.Item eventKey="dinner">Dinner</Dropdown.Item>
              <Dropdown.Item eventKey="drinks">Drinks</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Col>
    )
  }

  return (
    <div className="p-1">
      <Title />
      <InfoBox />
      <Filter />
      <RestMenu filter={filter}/>
    </div>
  )
}


export default App
