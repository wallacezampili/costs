import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import ProjectForm from '../project/Projectform';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import {v4 as uuidv4} from 'uuid'
import ServiceCard from '../services/ServiceCard'

function Edit()
{
    var {id} = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [servicesForm, setServicesForm] = useState(false);
    const [messageText, setText] = useState('');
    const [messageType, setType] = useState('success');

    useEffect(() => {
        var timer = setTimeout(() => { 
            
            fetch(`http://localhost:5000/projects/${id}`, {
                method:"GET",
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(
            (res) => {
                res.json().then(
                    (data) => {
                        setProject(data)
                        setServices(data.services)
                    }
                )
            }

            ).catch(
                (err) => {console.log(err.message)}
            );
            
            return clearTimeout(timer)
    
        },500);
    
    }, [id]);
    function destroy()
    {
        if(messageText == '')
        {
           
            return;
        }
        
        setText('');
        setType('');
    }
    function createService(project)
    {
       

        const lastService = project.services[project.services.length - 1];
        const newCost = parseFloat(lastService.cost) + parseFloat(project.cost)
        lastService.id = uuidv4();

        if(newCost > parseFloat(project.budget))
        {
            setType('error');
            setText('Orçamento ultrapassado, verifique o custo do serviço');
            scrollup();
            console.log(messageType)
            project.services.pop();
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(project)
        }).then(
            (res) => {
                res.json().then(
                    (data) => {
                        setServicesForm(false)
                        setProject(data)
                        setServices(data.services)
                    }
                )
            }
        ).catch(
            err => {console.log(`Error : ${err}`)}
        )

        setType('success')
        setText('Serviço adicionado com sucesso')
        scrollup();
    }

    function toggleForm()
    {
        setShowForm(!showForm)
    }
    function toggleServicesForm()
    {
        setServicesForm(!servicesForm)
    }
    function remove(id, cost)
    {

        console.log("ROMOVING " + id)
        const newServices = services.filter((service) => service.id != id);
        const newProject = project;

        newProject.cost =  parseFloat(newProject.cost) - parseFloat(cost) ;
        newProject.services = newServices;

        fetch(`http://localhost:5000/projects/${newProject.id}`,{
            method:"PATCH",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newProject)
        }).then(
            (res)=>{
                res.json().then(
                    (data) => {
                        
                        setProject(newProject)
                        setServices(newServices)
                        setText("Serviço deletado com sucesso")
                        setType("success")
                        scrollup();
                    }
                )
            }
        ).catch(
            err => console.log(`Error: ${err}`)
        )
    }
    function sendEdit(project)
    {
      

        if(parseFloat(project.cost) > parseFloat(project.budget))
        {
         
            setText("O custo não pode ser maior que o orçamento!");
            setType("error")
            scrollup()
            return
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
                        scrollup();
                    }
                )
            }
        ).catch(
            (err) => {
                console.log(`Erro : ${err.message}`)
            }
        )
    }

    function scrollup()
    {
        window.scrollTo(0, 0);
    }
    return(
        <>
            {project.name ? (
                <div className={styles.edit_container}>
                    <Container customClass="column">
                        {messageText && (
                        
                            <Message text={messageText} type={messageType} destroy={destroy}/>
                            
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
                    <div className={styles.services_container}>
                        <h2>Adicione um serviço: </h2>
                        <button onClick={toggleServicesForm} className={styles.btn}>
                                {!servicesForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        {servicesForm &&(
                            <ServiceForm 
                            btnText="Adicionar Serviço"
                            projectData={project}
                            handleSubmit={createService}
                            />
                        )}

                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services != 0 ? (
                            services.map((service) => (
                            <ServiceCard 
                                name={service.name}
                                id={service.id}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={remove}
                            />
                            ))
                        ) : (
                            <p>Não há serviços cadastrados</p>
                        )}
                    </Container>
                </div>
            ) : (<Loading />)}
        </>
    )
}
export default Edit;