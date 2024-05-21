
import { Trash } from "@phosphor-icons/react";
import { Tasks } from "./App";
import styles from "./TaskCard.module.css";
import Checked from "./assets/checked.svg";

type TasksCardProps = {
  task:Tasks
  onStatusChange: (taskId: string, isDone: boolean) => void;
  onDelete: (taskId:string)=> void;
}

export function TaskCard({task, onStatusChange, onDelete}:TasksCardProps){

  const handleCheckBoxChange = ()=> {
    onStatusChange(task.id, !task.isDone)
  
  }
  const handleDeleteTask = ()=>{
    
    
    
    onDelete(task.id)
  }


  return(
    
    
    <div className={styles.taskCard} >
      <label className={styles['rounded-checkbox']}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={handleCheckBoxChange}
      />
      <span className={  styles.checkmark}>{task.isDone&& <img src={Checked} className={styles.checkedIcon} />} </span>
    </label>
      <div
      className={ styles.taskContent}
      ><p className={task.isDone? styles.taskContentCheked : undefined}>{task.content}</p></div>
      <Trash onClick={handleDeleteTask} className={styles.trashIcon} />
    </div>
    
  )
  
}