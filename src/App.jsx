import { Link } from "react-router-dom"
import InfoBox from "./InfoBox"
import RestMenu from "./RestMenu"

const Title = () => {
  return (
    <h1 className="text-center">
      The Summer Demon's Diabolical Confections
    </h1>
  )
}

function App() {
  return (
    <div className="p-5">
      <Title />
      <InfoBox />
      <RestMenu />
    </div>
  )
}


export default App
