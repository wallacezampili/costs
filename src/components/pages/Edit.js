import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
function Edit()
{
    var param = useParams();
    const [project, setProject] = useState({})

    fetch(`http://localhost:5000/projects/${param.id}`).then(
        (res) => {
            res.json().then(
                (data) => {
                    setProject(data)
                }
            )
        }
    ).catch(
        (err) => {console.log(err.message)}
    )

    return(
        <div>
            <h1>{project.name}</h1>
        </div>
    )
}
export default Edit;