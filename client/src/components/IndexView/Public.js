//import VideoSelection from './VideoSelection'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import React, { Suspense } from 'react'

const VideoSelection = React.lazy(() => import('./VideoSelection'))
//main page
const Public = () => {

  return ( <>
    <HelmetProvider>
    <Helmet>
      <title>Character Rater</title>
    </Helmet>
    </HelmetProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <VideoSelection media={"movie"} time={"week"}/>
      <VideoSelection media={"tv"} time={"week"}/>
    </Suspense>
    </>
  )
}

export default Public