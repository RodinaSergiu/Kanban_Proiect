import './Task.css';

const Task = ({refresh, setRefresh, task, allTasks, setAllTasks, rowID, allRows}) => {
    const moveLeft = () => {
        if(rowID > 0) {
            var currentRowIndex = 0
            allRows.forEach((row, index) => { 
                if (row.id == rowID) {
                    currentRowIndex = index
                }
            })

            const destinationRowIndex = currentRowIndex > 0  ? currentRowIndex - 1 : currentRowIndex
            allTasks.forEach((eachTask) => {
                if(eachTask.id === task.id) {
                    eachTask.rowID = allRows[destinationRowIndex].id
                }
            })
            setAllTasks(allTasks);
            setRefresh(!refresh);
        }
    }


    const moveRight = () => {
        if(rowID < allTasks.length - 1) {
            var currentRowIndex = 0
            allRows.forEach((row, index) => { 
                if (row.id == rowID) {
                    currentRowIndex = index
                }
            })


            const destinationRowIndex = currentRowIndex < allRows.length-1 ? currentRowIndex + 1 : currentRowIndex
            allTasks.forEach((eachTask) => {
                if(eachTask.id === task.id) {
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

    return (
        <div className='task bg-hero'>
            <h3>{task.text}</h3>
            <div>
                <button onClick={moveLeft} className='btn btn-primary' hidden={rowID == allRows[0].id}>Move left</button>
                <button onClick={deleteTask} className='btn btn-danger mx-3'>Delete</button>
                <button onClick={moveRight} className='btn btn-primary' hidden={rowID == allRows[allRows.length-1].id}>Move right</button>
            </div>
        </div>
    )
}

export default Task;