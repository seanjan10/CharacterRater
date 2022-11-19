import { Routes, Route } from 'react-router-dom'
import Layout from './components/LayoutView/Layout'
import Public from './components/IndexView/Public'
import Login from './components/Login'
import MediaPage from './components/MediaView/MediaPage'
import CharacterPage from './components/CharacterView/CharacterPage'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="tv/:id" element={<MediaPage media="tv"/>} />
        <Route path="movie/:id" element={<MediaPage media="movie"/>} />
        <Route path="character/:id" element={<CharacterPage />} />
      </Route>
    </Routes>
  )
}

export default App