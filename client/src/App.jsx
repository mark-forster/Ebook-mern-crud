import {BrowserRouter as Routers, Route, Routes} from 'react-router-dom'
import Home from './routes/Home/home.jsx'
import About from './routes/About/about.jsx'
import Book from './routes/Book/book.jsx'
import SigleBook from './routes/Book/sigleBook.jsx'
import CreateBook from './routes/Book/createBook.jsx'
import EditBook from './routes/Book/editBook.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
function App() {
  return (
    <>
      <Routers className="start">
          <Header />
        <Routes>
          <Route path='/' element={<Home />} className="nav_link"/>
          <Route path='/about' element={<About />}className="nav_link" />
          <Route path='/books' element={<Book />} />
          <Route path='/books/:slug' element={<SigleBook />} className="nav_link"/>
          <Route path='/create-book' element={<CreateBook />} classNmae='nav_link' />
          <Route path='/edit-book/:slug' element={<EditBook />} classNmae='nav_link' />
        </Routes>
        <Footer />
      </Routers>
    </>
  )
}

export default App
