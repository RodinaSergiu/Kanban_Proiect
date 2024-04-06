import { useState } from 'react';
import './Task.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Task = ({ refresh, setRefresh, task, allTasks, setAllTasks, rowID, allRows }) => {
    const [show, setShow] = useState(false)
    
    const moveLeft = () => {
        if (rowID > 0) {
            var currentRowIndex = 0
            allRows.forEach((row, index) => {
                if (row.id == rowID) {
                    currentRowIndex = index
                }
            })

            const destinationRowIndex = currentRowIndex > 0 ? currentRowIndex - 1 : currentRowIndex
            allTasks.forEach((eachTask) => {
                if (eachTask.id === task.id) {
                    eachTask.rowID = allRows[destinationRowIndex].id
                }
            })
            setAllTasks(allTasks);
            setRefresh(!refresh);
        }
    }


    const moveRight = () => {
        if (rowID < allTasks.length - 1) {
            var currentRowIndex = 0
            allRows.forEach((row, index) => {
                if (row.id == rowID) {
                    currentRowIndex = index
                }
            })


            const destinationRowIndex = currentRowIndex < allRows.length - 1 ? currentRowIndex + 1 : currentRowIndex
            allTasks.forEach((eachTask) => {
                if (eachTask.id === task.id) {
                    eachTask.rowID = allRows[destinationRowIndex].id
                }
            })
            setAllTasks(allTasks);
            setRefresh(!refresh);
        }
    }

    const deleteTask = () => {
        const newTasks = allTasks.filter((eachTask) => eachTask.id !== task.id)
        setAllTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    const taskHasSubtasks = (task) => {
        if (task.subtasks && task.subtasks.length > 0) {
            return true
        }
        return false
    }

    const completedSubtasks = (task) => {
        return task.subtasks
            .map((subtask) => subtask.isCompleted ? 1 : 0)
            .reduce((acc, item) => acc + item, 0)
    }

    const handleShowDetails = (e) => {
        e.preventDefault()

        console.log("asdasdasd")
        setShow(true)
    }


    const handleClose = () => setShow(false)


    return (
        <div className='task bg-hero'>
            <h3 onClick={handleShowDetails}>{task.text}</h3>
            {taskHasSubtasks(task)
                ? <p> {completedSubtasks(task)} of {task.subtasks.length} substasks  </p>
                : <p> {task.description} </p>
            }
            <div>
                <button onClick={moveLeft} className='btn btn-primary' hidden={rowID == allRows[0].id}>Move left</button>
                <button onClick={deleteTask} className='btn btn-danger mx-3'>Delete</button>
                <button onClick={moveRight} className='btn btn-primary' hidden={rowID == allRows[allRows.length - 1].id}>Move right</button>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{task.text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{task.description}</p> 
                    { task.subtasks &&
                        <p>Subtasks ({completedSubtasks(task)} of {task.subtasks.length})</p>
                    }
                <Form>
                    <div key="1" className='mb-3'>
                        {
                            task.subtasks && task.subtasks.map((subtask, index) => 
                            <Form.Check type="checkbox" id={index} label={subtask.name}/>)
                        }

                        
                    </div>
                <p>Status</p>
                <Form.Select aria-label="Default select example" 
                            disabled={true}
                            defaultValue ="0">
                                {allRows.map((row) => (
                                    <option value={row.id}>{row.title}</option>
                                )) }
                            </Form.Select>
                </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Task;