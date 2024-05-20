
import './global.css'

import { PlusCircle } from "@phosphor-icons/react"

import { useState } from 'react'
import styles from "./App.module.css"
import Logo from "./assets/logo.svg"

function App() {

  const [createdTasks, setCreatedTasks] = useState(2);
  const [doneTasks,setDoneTasks] = useState(0)

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
            <input type="text" className={styles.input} placeholder='Adicione uma tarefa' />
            <button type='submit' className={styles.createButton}>
              <p 
              className={styles.createText}
              >Criar</p>
  
              <PlusCircle className={styles.addIcon} />
            </button>
  
          </div>
        </section>
        <section>
          <div className={styles.taskBox}>
            <div className={styles.tasksCount}>
              <p className={styles.createdTasks} >Tarefas criadas <span>{createdTasks}</span></p>
              <p className={styles.doneTasks} >Concluídas <span>{doneTasks}</span></p>


            </div>

          </div>
        </section>
      </main>
    
    </>
  )
}
export default App
