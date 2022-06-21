import styles from './ServiceCard.module.css';
import {BsFillTrashFill as Trash} from 'react-icons/bs';;

function ServiceCard({id, name, cost, description, handleRemove})
{

    const remove = (e) => 
    {
        handleRemove(id, cost)
    }

    return(
        <div className={styles.project_card}>
             <h4>{name}</h4>
             
             <p>
                <span>Custo: </span> R${cost}
            </p>
            <p>
                {description}
            </p>
            <div className={styles.actions}>
                <button onClick={remove}><Trash/> Excluir</button>
            </div>
            

        </div>
    );
}

export default ServiceCard;