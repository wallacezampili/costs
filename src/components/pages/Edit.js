import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import ProjectForm from '../project/Projectform';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
function Edit()
{
    var {id} = useParams();
    const [project, setProject] = useState({})
    const [showForm, setShowForm] = useState(false);
    const [messageText, setText] = useState();
    const [messageType, setType] = useState();
    useEffect(() => {
        var timer = setTimeout(() => { fetch(`http://localhost:5000/projects/${id}`).then(
            (res) => {
                res.json().then(
                    (data) => {
                        setProject(data)
                    }
                )
                }
            ).catch(
                (err) => {console.log(err.message)}
            );
            
            return clearTimeout(timer)
    
        },500);
    
    }, [id])

    function toggleForm()
    {
        setShowForm(!showForm)
    }

    function sendEdit(project)
    {
        if(project.cost > project.budget)
        {
            setText("O custo não pode ser maior que o orçamento!");
            setType("error")
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(project)
        }).then(
            (res) =>{
                res.json().then(
                    (data) => {
                        setProject(data);
                        toggleForm();
                        setText("Projeto atualizado!")
                        setType("success")
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(`Erro : ${err.message}`)
            }
        )
    }

    return(
        <>
            {project.name ? (
                <div className={styles.edit_container}>
                    <Container customClass="column">
                        {messageText && (
                            <Message text={messageText} type={messageType}/>
                        )}
                        <div className={styles.details_container}>
                            <h1>Projeto : {project.name}</h1>
                            <button onClick={toggleForm} className={styles.btn}>
                                {!showForm ? 'Editar Projecto' : 'Fechar'}
                            </button>

                            {showForm ? (
                            <div className={styles.info}>
                                <ProjectForm projectData={project} handleSubmit={sendEdit} btnText='Concluir Edição'/>
                            </div>
                            ) 
                            : 
                            (
                                <div className={styles.info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    
                                    <p>
                                        <span>Total Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            )}

                        </div>
                    </ Container>
                </div>
            ) : (<Loading />)}
        </>
    )
}
export default Edit;