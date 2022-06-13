import { Link } from "react-router-dom";
import styles from './Navbar.module.css'

function Navbar()
{
    return(
        <div>
            
            <nav className={styles.navbar}>
                <Link to='/'>Home</Link>
                <Link to='/newproject'>New Project</Link>
                <Link to='/projects'>Projects</Link>
                <Link to='/company'>Empresa</Link>
                <Link to='/contact'>Contato</Link>
            </nav>

        </div>
    )
}
export default Navbar;