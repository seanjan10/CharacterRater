import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {

    const content = (<div>
        <Navbar />
        <Outlet />
        <Footer />
        </div>
    )

  return content
}

export default Layout