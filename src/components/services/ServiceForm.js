import Input from "../form/Input"
import Submit from "../form/Submit"

import styles from './ServiceForm.module.css'
import { useState } from 'react';


function ServiceForm({handleSubmit, projectData, btnText})
{
    const [service, setService] = useState({})

    function handleChange(e)
    {
        setService({...service, [e.target.name] : e.target.value})
    }
    function submit(e)
    {
        e.preventDefault();
        projectData.services.push(service)
        handleSubmit(projectData);
    }
    return(

        <form className={styles.form} onSubmit={submit}>

            <Input 
                type="text"
                placeholder="Insira o nome do serviço" 
                name="name" 
                text="Nome do serviço" 
                handleOnchange={handleChange} 
            />
            
            <Input 
                type="number"
                placeholder="Insira o custo do serviço" 
                name="cost" 
                text="Custo total do serviço" 
                handleOnchange={handleChange} 
            />

            <Input 
                type="text"
                placeholder="Descreva o serviço" 
                name="description" 
                text="Descrição do serviço" 
                handleOnchange={handleChange} 
            />

            <Submit text={btnText}/>
        </form>

    );
}

export default ServiceForm;