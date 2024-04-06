import { useState } from 'react';
import './Header.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Header = ({allTasks, setAllTasks, allRows}) => {
    const [show, setShow] = useState(false)
    const [taskTitle, setNewTaskTitle] = useState('')
    const [taskDescription, setNewTaskDescription] = useState('')
    const [taskRow, setNewTaskRow] = useState('')
    const [subtask1, setNewTaskSubstask1] = useState('')
    const [subtask2, setNewTaskSubstask2] = useState('')
    const [subtask3, setNewTaskSubstask3] = useState('')



    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const handleAddSubTask = (event) => {
        event.preventDefault()
     }

    const handleSave = (event) => {
        event.preventDefault()
        console.log(taskTitle)
        console.log(taskRow)
        
        const subtasks = []
        if (subtask1 != '') subtasks.push({name: subtask1, isCompleted: false})
        if (subtask2 != '') subtasks.push({name: subtask2, isCompleted: false})
        if (subtask3 != '') subtasks.push({name: subtask3, isCompleted: false}) 

        const newTask = {
            id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0,
            text: taskTitle,
            description: taskDescription,
            subtasks: subtasks,
            rowID: parseInt(taskRow)
        }

        const localStorageTasks = [...allTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
        setAllTasks([...allTasks, newTask])

        handleClose()
    }

    return (
        <div className='header bg-hero d-flex user-select-none'>
            <h2>Platform Launch</h2>
            <button onClick={handleOpen}>+ Add New Task</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.taskName">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g Take coffee break"
                                autoFocus
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.taskDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little" 
                                onChange={(e) => setNewTaskDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.subtasks">
                            <Form.Label>Subtasks</Form.Label>
                            <Form.Control type="text" placeholder="e.g Make coffee>" onChange={(e) => setNewTaskSubstask1(e.target.value)}/>
                            <Form.Control type="text" placeholder="e.g Drink cofee & smile>" onChange={(e) => setNewTaskSubstask2(e.target.value)}/>
                            <Form.Control type="text" placeholder="e.g somenthing else>" onChange={(e) => setNewTaskSubstask3(e.target.value)}/>
                            {/* <button onClick={handleAddSubTask}> + Add New Subtask</button> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.taskStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" 
                            onChange={(e) => setNewTaskRow(e.target.value)}
                            defaultValue ="0">
                                {allRows.map((row) => (
                                    <option key={row.id} value={row.id}>{row.title}</option>
                                )) }
                            </Form.Select>
                        </Form.Group>

                        <button onClick={handleSave}> Create Task </button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Header;