import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './components/Login'
import MediaPage from './components/MediaPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="tv/:id" element={<MediaPage media="tv"/>} />
        <Route path="movie/:id" element={<MediaPage media="movie"/>} />
      </Route>
    </Routes>
  )
}

export default App