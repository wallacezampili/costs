import ProjectForm from '../project/Projectform';
import styles from './NewProject.module.css'

function NewProject(){

    function Post(project)
    {
        fetch("http://localhost:5000/projects", {
            method : "Post", headers : 
            {
                "Content-type" : "application/json",
                body : JSON.stringify(project)}
        }).then(res => {
            res.json().then(data => {
                //redirect
            })
        })
        .catch(err =>{
            console.log(`Erro : ${err.message}`);
        })
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto" handleSubmit={Post}/>
        </div>
    )
}

export default NewProject;