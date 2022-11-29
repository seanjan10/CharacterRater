//import VideoSelection from './VideoSelection'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import VideoSelection from './VideoSelection'
//import React from 'react'

//const VideoSelection = React.lazy(() => import('./VideoSelection'))
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

/*  <Suspense fallback={<div>Loading...</div>}>
      <VideoSelection media={"movie"} time={"week"}/>
      <VideoSelection media={"tv"} time={"week"}/>
    </Suspense> */