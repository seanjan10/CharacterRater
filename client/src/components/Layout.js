import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {

    const content = (<div>
        <Navbar />
        <Outlet />
        <h2>This will be the footer</h2>
        </div>
    )

  return content
}

export default Layout