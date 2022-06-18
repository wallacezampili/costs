import './App.css';

import Home from'./components/pages/Home';
import Contact from'./components/pages/Contact';
import Company from'./components/pages/Company';
import NewProject from'./components/pages/NewProject';
import Projects from'./components/pages/Projects';
import Edit from './components/pages/Edit';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container';

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>

      <Navbar/>
      <Container customClass='min_height'>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/company' element={<Company/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/newproject' element={<NewProject/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/projects/:id' element={<Edit />}/>
        </Routes>
      </Container>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
