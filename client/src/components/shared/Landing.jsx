import React from 'react'
import { Link } from 'react-router-dom'

import C4Clogo from '../../assets/C4C-branding/Climbing-For-Change-Logo_Green.png'

const Landing = () => {
  return (
    <div className='p-6 text-center'>
      <a href='https://www.climbingforchange.ca/' target='_blank' rel="noreferrer">
        <img src={C4Clogo} alt='Climbing for Change Logo' height={300} />
      </a>
      <h1 className='text-3xl font-bold mb-4'>
        Welcome to the C4C Team Two WebApp
      </h1>
      <h2 className="text-lg mb-6">
        This is a temporary page while development is underway.
      </h2>

      <p className="mb-2">Visit these existing pages that are currently in development</p>
      <nav>
        <ul className="list-none p-0 flex justify-center space-x-6">
          <li>
            <Link
              to="/progress"
              className="text-blue-600 hover:underline font-medium"
            >
              Progress Board
            </Link>
          </li>
          <li>
            <Link
              to="/admin" 
              className="text-blue-600 hover:underline font-medium"
            >
              Admin Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Landing
