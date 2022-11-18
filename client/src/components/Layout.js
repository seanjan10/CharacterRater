import { Outlet } from 'react-router-dom'


const Layout = () => {

    const content = (<div>
        <h1> This is the layout</h1>
        <Outlet />
        <h2>This will be the footer</h2>
        </div>
    )

  return content
}

export default Layout