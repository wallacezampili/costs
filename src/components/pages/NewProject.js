import ProjectForm from '../project/Projectform';
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'

function NewProject() {

    const navigate = useNavigate()

    function Post(project) {

        //Inicializing 

        project.cost = 0
        project.services = []
        
        fetch("http://localhost:5000/projects", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(project)
            }).then(res => {
                res.json().then(data => {
                    
                    navigate('/projects', {state : {message : "Projeto criado com sucesso"}});

                })
            })
            .catch(err => {
                console.log(`Erro : ${err.message}`);
            })



    }


    return ( 
        <div className = {styles.newproject_container}>
            <h1> Criar Projeto </h1>
            <p> Crie seu projeto para depois adicionar os serviços </p> 
            < ProjectForm btnText = "Criar Projeto"
            handleSubmit = {Post}/> 
        </div>
    )
}

export default NewProject;