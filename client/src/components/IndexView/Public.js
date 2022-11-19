import VideoSelection from './VideoSelection'
import { Link } from 'react-router-dom'

//main page
const Public = () => {
  return ( <>
    <VideoSelection media={"movie"} time={"week"}/>
    <VideoSelection media={"tv"} time={"week"}/>
    </>
  )
}

export default Public