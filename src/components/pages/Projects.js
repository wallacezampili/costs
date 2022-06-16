import Message from "../layout/Message";
import styles from "./Projects.module.css"
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'
import ProjectCard from "../project/ProjectCard";

function Projects(){

    const location = useLocation();
    let message = '';

    if(location.state)
    {
        message = location.state.message
    }

    const [projects, setProjects] = useState([]);

    useEffect(() => 
    {
        fetch("http://localhost:5000/projects", 
        {
            method: "GET", 
            headers:{
                "Content-type" : "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {
                
                setProjects(data)
            })
        }).catch((err) => {
            console.error("Erro : " + err);
        })
    }, [])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && (<Message text={message} type="success"/>)}
            <Container customClass="start">
               
                {projects.map((item) => (<ProjectCard name={item.name} key={item.id} category={item.category.name} id={item.id} budget={item.budget}/>))}

            </Container>
        </div>
        


    )
}

export default Projects;