import Input from "../form/Input"
import Select from "../form/Select"
import Submit from "../form/Submit"
import styles from './ProjectForm.module.css'
import { useEffect, useState } from 'react';


function ProjectForm({btnText, projectData, handleSubmit})
{
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
   useEffect(() =>
   {
    fetch("http://localhost:5000/categories", 
    {
        method: "GET", 
        headers: {"Content-Type" : 'application/json'}
    
    }).then((promise) => {
        promise.json()
        .then(data => 
            {
                setCategories(data);
        
            })
        })
        .catch((error) => {
            console.log("Erro : " + error.message)
        });

   }, []);

   function handleChange(e)
   {
    setProject({...project, [e.target.name] : e.target.value});
   }
   function handleSelect(e)
   {
    setProject({...project, category : {
        id : e.target.value, 
        name : e.target.options[e.target.selectedIndex].text
    }
    });
   }
   const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
   }

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input type="text" placeholder="Insira o nome do projeto" name="name" text="Nome do Projeto" handleOnchange={handleChange} value={project.name ? project.name : ''}/>
            <Input type="number" placeholder="Insira o orçamento total" text="Orçamento do Projeto" name="budget" handleOnchange={handleChange} value={project.budget ? project.budget : ''}/>

            <Select text="Categoria do projeto" name="category_id" options={categories} handleOnchange={handleSelect} value={project.category ? project.category.id : ''}/>
            <Submit text={btnText}/>
        </form>
    )
}
export default ProjectForm