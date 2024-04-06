import './NewTask.css';
import { useState } from 'react';

const NewTask = ({allTasks, setAllTasks, rowID}) => {
    const [newTask, setNewTask] = useState({
        id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0,
        text: '',
        rowID: rowID
    });
    const handleNewTask = () => {
        if(newTask.text !== '') {
            const localStorageTasks = [...allTasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
            setAllTasks([...allTasks, newTask])
            setNewTask({...newTask, id: newTask.id + 1, text: ''})
        }
    }

    return (
        <div className='task bg-hero-transparent'>
            <input type='text' value={newTask.text} onChange={(e) => setNewTask({...newTask, text: e.target.value})} className='add-task' placeholder='New Task...' />
            <span onClick={() => handleNewTask()} className='add-task-btn cursor-pointer'>+</span>
        </div>
    )
}

export default NewTask;