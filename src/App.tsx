import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Title from "./pages/Title"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:searchText/:page" element={<Movies />} />
          <Route path="/title/:imdbId" element={<Title />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
