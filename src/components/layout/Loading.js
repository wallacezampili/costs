import styles from './Loading.module.css'
import load from '../../img/loading.svg'

function Loading()
{
    return(
        <div className={styles.container}>
            <img src={load} className={styles.loading}/>
        </div>
    )
}
export default Loading