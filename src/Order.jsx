import { Link } from "react-router-dom"

function Order() {
  return (
    <div className="p-5">
      <Link to='/'>{'<- Back'}</Link>
      <h1>About Page</h1>
    </div>
  )
}

export default Order