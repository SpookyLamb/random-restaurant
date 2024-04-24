// Must Have
// Make some wireframes for the website design (include them in your repo as photos and/or screenshots) (DONE)
// Generate the following information:
  // The restaurant's name (DONE)
  // The restaurant's address (DONE)
  // The restaurant's hours of operation (DONE)
// Access the API using Axios installed with npm. (DONE) 
// Create a dynamic restaurant menu (DONE)
// Choose a specific menu section type to display (Appetizers, Pasta, Sandwiches, etc) (DONE)
// Dynamically render at least 15 menu items. (DONE)
// Manage the React Component State (DONE) 
// Website must be responsive (DONE)
// Website should be mobile first (DONE)

// Should Have
// Multiple menu categories with a way to switch between them.
// Dropdown that filters menu in some way (category, cuisine, price, spice, time of day)

// Could Have
// Create your own JSON and upload to the jsonkeeper.com to customize your items. (Structure could also change)
// Add images for menu items.
// Pepper Emojis/icons/pictures for spicy level
// Text search to filter menu
// Include a different 'specials' menu for each day of the week that the restaurant is open and show that menu based on the current day (should prove to work throughout the week) as well as what was on the specials menu yesterday/ what will be on the specials menu tomorrow. Can be done randomly.  Could store value in localStorage so it doesn’t change.

// Wish List
// Let a user add comment to menu item 
// Let a user like or dislike menu items - show counts
// Embed a Google Map component showing the location of the restaurant.  A good resource:  https://www.npmjs.com/package/@googlemaps/js-api-loader
// Add a ‘shopping cart’ to add items to for online ordering.  Save the data via localStorage. 

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import About from './About'
import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'

const site = import.meta.env.BASE_URL


function Layout() {
  return (
      <>
        <Header />
        <div id='page-content'>
          <Outlet />
        </div>
        <Footer />
      </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  }
], {
  basename: site
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
