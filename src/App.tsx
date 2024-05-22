
import './global.css'

import { PlusCircle } from "@phosphor-icons/react"

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from "./App.module.css"
import { TaskCard } from './TaskCard'
import Clipboard from "./assets/Clipboard.svg"
import Logo from "./assets/logo.svg"

export interface Tasks{
  id:string;
  content:string;
  isDone:boolean
}

interface FormData{
  task:string
}


function App() {

  const [tasks,setTasks] = useState<Tasks[]>([])
  const [createdTasks, setCreatedTasks] = useState<number>(tasks.length);
  const [doneTasks,setDoneTasks] = useState(0)

  const taskSchema = z.object({
    task: z.string({message:"Você precisa preencher o campo"}).min(1, {message:"Você precisa preencher o campo"})
  })

  const {control, handleSubmit, formState:{errors},setValue} = useForm<FormData>({
    resolver: zodResolver(taskSchema)
  })

  useEffect(()=>{
    setCreatedTasks(tasks.length)
    setDoneTasks(tasks.filter(tasks => tasks.isDone).length)

  },[tasks])

  const handleCreateTasK = ({task}:FormData)=>{

    setTasks(prev => [...prev, {
      content:task,
      id:crypto.randomUUID(),
      isDone:false
    }])
    setValue("task", "")
   
  }
  
  const handleTaskStatusChange = (taskId:string, isDone:boolean)=>{

    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? {...task, isDone}:task))

  }

  const deleteTask = (taskId:string)=>{
    setTasks(tasks.filter(task => task.id !== taskId))

  }
  return(
    <>
      <header className={styles.header}>

        <img src={Logo}
        className={styles.logo}
        
        />

      </header>

      <main>
        <section>
          <div
          className={styles.addbox}
          >
            <Controller
            name='task'
            control={control}
            render={({field:{onChange,value}})=>(
              <input type="text" className={styles.input}  placeholder='Adicione uma tarefa' value={value} onChange={onChange} />

            )}
            />
            <button type='submit' className={styles.createButton} onClick={handleSubmit(handleCreateTasK)} >
              <p 
              className={styles.createText}
              >Criar</p>

              <PlusCircle className={styles.addIcon} />
            </button>
  
          </div>
          {errors.task && 
          <p className={styles.formError}>{errors.task.message}</p>
          }
        </section>
        <section>
          <div className={styles.taskBox}>
            <div className={styles.tasksCount}>
              <div className={styles.createdTasks}><p>Tarefas criadas </p>
              <span>{createdTasks}</span>
              </div>
             <div className={styles.doneTasks}> <p>Concluídas </p>
             <span className={createdTasks>0 ? styles.doneTasksSpanNoZero: styles.doneTasksSpan}>{createdTasks < 1? doneTasks: `${doneTasks} de ${createdTasks}`}</span>
             </div>
            </div>

          <div className={createdTasks > 0 ? styles.taskList : styles.taskListNoTasks}>
            {tasks.length === 0 ? 
           <div className={styles.noTasksCard}> 
           <img src={Clipboard} className={styles.clipboardIcon} />
           <p style={{
            fontWeight:'bold'
           }} >Você ainda não tem tarefas cadastradas</p>
           <p>Crie tarefas e organize seus itens a fazer</p>
           
           </div>
            
            : tasks.map(task => (
              <TaskCard key={task.id} task={task} onStatusChange={handleTaskStatusChange} onDelete={deleteTask}/>
            ))
          
          }
          </div>

          </div>
        </section>
      </main>
    
    </>
  )
}
export default App
