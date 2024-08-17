import { FC } from 'react'
import { Link } from 'react-router-dom'

const Home: FC = () => {
  return (
    <div>
      <h1 className='text-2xl'>Home Page</h1>
      <Link to="/home/dashboardv2" className="text-blue-700">Dashboard</Link>
    </div>
  )
}

export default Home
