import './App.css';

import Home from'./components/pages/Home';
import Contact from'./components/pages/Contact';
import Company from'./components/pages/Company';
import NewProject from'./components/pages/NewProject';
import Projects from'./components/pages/Projects';

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>

      <Navbar/>
      
      <Routes>

        <Route exact path='/' component={<Home/>}/>
        <Route path='/company' component={<Company/>}/>
        <Route path='/contact' component={<Contact/>}/>
        <Route path='/newproject' component={<NewProject/>}/>
        <Route path='/projects' component={<Projects/>}/>
      
      </Routes>
      
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
