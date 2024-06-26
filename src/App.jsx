import { Link } from "react-router-dom"
import InfoBox from "./InfoBox"
import RestMenu from "./RestMenu"
import Dropdown from "react-bootstrap/Dropdown"
import Col from 'react-bootstrap/Col'
import { useState } from "react"

const Title = () => {
  return (
    <Col className="col-12 col-lg-8 mx-auto">
      <h1 className="text-center p-3 rubik-mono">
        The Summer Demon's Diabolical Confections
      </h1>
    </Col>
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
            <Dropdown.Toggle className="rubik-mono-white" variant="danger">
              Filter
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="rubik-mono">
              <Dropdown.Item eventKey="">None</Dropdown.Item>
              <Dropdown.Item eventKey="cookies">Cookies</Dropdown.Item>
              <Dropdown.Item eventKey="cakes">Cakes</Dropdown.Item>
              <Dropdown.Item eventKey="doughnuts">Doughnuts</Dropdown.Item>
              <Dropdown.Item eventKey="pastries">Pastries</Dropdown.Item>
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
