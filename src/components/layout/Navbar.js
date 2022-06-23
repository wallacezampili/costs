import { Link } from "react-router-dom";
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
import Container from "./Container";
import {AiOutlineMenu as Menu, AiOutlineClose as Close} from 'react-icons/ai'
import {IoIosArrowUp as Close2} from 'react-icons/io'
import {useState} from 'react'
function Navbar()
{

    const [toggleDisplay, setToggleDisplay] = useState(false);
    function ShowNav()
    {
        setToggleDisplay(!toggleDisplay)
    }
    return(
       
            
        <nav className={styles.navbar}>

            <Container>

                <Link to="/"><img src={logo} alt=''/></Link>

                <ul className={styles.list}>

                    <li className={styles.item} ><Link to='/'>Home</Link> </li>
                    <li className={styles.item} > <Link to='/projects'>Projetos</Link> </li>
                    <li className={styles.item} > <Link to='/company'>Empresa</Link> </li>
                    <li className={styles.item} >  <Link to='/contact'>Contato</Link> </li>
                    
                </ul>

                <div className={styles.list_mobile}>
                    {toggleDisplay ? (<Close2 onClick={ShowNav} className/>) : (<Menu onClick={ShowNav}/>) }
                </div>
                {
                toggleDisplay && ( 
                <div className={`${styles.mobile_menu_container} ${styles.scale_up_top}`}>

                    <ul className={styles.mobile_menu}>

                    <li className={styles.item_mobile} ><Link to='/'>Home</Link> </li>
                    <li className={styles.item_mobile} > <Link to='/projects'>Projetos</Link> </li>
                    <li className={styles.item_mobile} > <Link to='/company'>Empresa</Link> </li>
                     <li className={styles.item_mobile} >  <Link to='/contact'>Contato</Link> </li>

                    </ul>

                </div>)}
               

            </Container>

        
        </nav>
           

       
    )
}
export default Navbar;