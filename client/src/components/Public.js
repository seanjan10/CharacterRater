import VideoSelection from './VideoSelection'
import { Link } from 'react-router-dom'

//main page
const Public = () => {
  return ( <>
    <div>Public</div>
    <Link to="/login">Redirect to Login</Link>
    <VideoSelection media={"movie"} time={"week"}/>
    <VideoSelection media={"tv"} time={"week"}/>
    </>
  )
}

export default Public