import { Link } from "react-router-dom"
import InfoBox from "./InfoBox"

const Title = () => {
  return (
    <h1>
      Hello World!
    </h1>
  )
}

function App() {
  return (
    <div className="p-5">
      <Link to='/about'>About</Link>
      <Title />
      <InfoBox />
    </div>
  )
}


export default App
