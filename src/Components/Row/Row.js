import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import './Row.css';

const Row = ({tasks, allTasks, setAllTasks, refresh, setRefresh, rowID, title, rows, setRows}) => {

    const handleDeleteRow = () => {
        const newRows = rows.filter((row) => row.id !== rowID)
        const newTasks = allTasks.filter((task) => task.rowID !== rowID);
        localStorage.setItem('rows', JSON.stringify(newRows));
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setAllTasks(newTasks);
        setRows(newRows);
    }

    return (
        <div className='task-row'>
            <div className='d-flex mb-4 align-items-center'>
                <h3 className='row-title m-0'>{title} ({tasks.length})</h3>
                <span onClick={handleDeleteRow} className='ms-3 cursor-pointer text-danger'>X</span>
            </div>
            <div>
                {tasks.length > 0 && tasks.map((task, index) => (
                    <Task refresh={refresh} setRefresh={setRefresh} task={task} allTasks={allTasks} setAllTasks={setAllTasks} rowID={rowID} key={index} allRows={rows} />
                ))}
                <NewTask allTasks={allTasks} setAllTasks={setAllTasks} rowID={rowID} />
            </div>
        </div>
    )
}

export default Row;
