import Message from "../layout/Message";
import styles from "./Projects.module.css"
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import Loading from "../layout/Loading";
import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'
import ProjectCard from "../project/ProjectCard";


function Projects(){

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const [projectMessage, setProjectMessage] = useState()
    let message = ''

    if(location.state)
    {
        message = location.state.message
    }

    function scrollup()
    {
        window.scrollTo(0, 0);
    }

    useEffect(() => 
    {
        setTimeout( () => { fetch("http://localhost:5000/projects", 
        {
            method: "GET", 
            headers:{
                "Content-type" : "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {
                
                setProjects(data)
                setLoading(false)
            })
        }).catch((err) => {
            console.error("Erro : " + err);
        })}, 500);
       
    }, [])
    function destroy()
    {
        if(projectMessage == '')
        {
        
            return;
        }
        
        setProjectMessage('');
    }
    function removeProject(id)
    {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(res => {res.json().then(() => {
            
            
            let newProjects = projects.filter((project) => project.id != id)
            setProjects(newProjects)
            setProjectMessage("Projeto Removido com sucesso!")
            scrollup();
            
            
        })}).catch(err => {console.log("Erro : " + err.message)})
    }
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && (<Message text={message} type="success" destroy={destroy}/>)}
            {projectMessage && (<Message text={projectMessage} type="success" destroy={destroy}/>)}
            <Container customClass="start">
               {projects.length > 0 ? (                    
                
                    projects.map((item) => (<ProjectCard name={item.name} key={item.id} category={item.category.name} id={item.id} budget={item.budget} handleRemove={removeProject}/>))
                ) : (
                    <p>Não há projetos registrados</p>
                )
               }
               {loading && (
                <Loading/>
               )}
            </Container>
        </div>
        


    )
}

export default Projects;