import styles from './ProjectCard.module.css'
import LinkButton from '../layout/LinkButton'
import {BsFillTrashFill as Trash, BsPencilFill as Pencil} from 'react-icons/bs';
import {Link} from 'react-router-dom'
function ProjectCard({name, budget, category, handleRemove, id})
{

    function remove(e)
    {
        e.preventDefault();
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>

            <h4>{name}</h4>

            <p> <span>Orçamento: </span> R${budget}</p> 

            <p className={styles.category}> <span className={`${styles[category.toLowerCase()]}`}> </span> {category} </p>

            <div className={styles.actions}>
                <Link to={`/projects/${id}`}><Pencil /> Editar</Link>
                <button onClick={remove}><Trash/> Excluir</button>
            </div>

        </div>
    )
}
export default ProjectCard