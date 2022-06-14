import Input from "../form/Input"
import Select from "../form/Select"
import Submit from "../form/Submit"
import styles from './ProjectForm.module.css'
import { useEffect, useState } from 'react';


function ProjectForm({btnText})
{
    const [categories, setCategories] = useState([]);
   useEffect(() =>
   {
    fetch("http://localhost:5000/categories", 
    {
        method: "GET", 
        headers: {"Content-Type" : 'application/json'}
    
    }).then(promise => {
        promise.json()
        .then(data => 
            {
                setCategories(data);
              
            })
        })
        .catch(error => {
            console.log("Erro : " + error.message)
        });

   }, []);
    return(
        <form className={styles.form}>
            <Input type="text" placeholder="Insira o nome do projeto" name="name" text="Nome do Projeto"/>
            <Input type="number" placeholder="Insira o orçamento total" text="Orçamento do Projeto" name="budget"/>
            <Select text="Categoria do projeto" name="category_id" options={categories}/>
            <Submit text={btnText}/>
        </form>
    )
}
export default ProjectForm