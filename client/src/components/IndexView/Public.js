import VideoSelection from './VideoSelection'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
//main page
const Public = () => {

  return ( <>
    <HelmetProvider>
    <Helmet>
      <title>Character Rater</title>
    </Helmet>
    </HelmetProvider>
    <VideoSelection media={"movie"} time={"week"}/>
    <VideoSelection media={"tv"} time={"week"}/>
    </>
  )
}

export default Public