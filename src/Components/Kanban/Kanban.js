import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { useState } from 'react';
import './Kanban.css';
import Row from '../Row/Row';
import NewRow from '../NewRow/NewRow';

const Kanban = () => {
    const [rows, setRows] = useState(localStorage.getItem('rows') ? JSON.parse(localStorage.getItem('rows')) : [])
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [])
    const [refresh, setRefresh] = useState(false);

    return (
        <div className='h-100 d-flex app-wrapper'>
            <div className='bg-hero menu-container user-select-none'>
                <Menu />
            </div>
            <div className='app-container p-0'>
                <Header />
                <div className='bg-hero-secondary tasks-container user-select-none'>
                    {rows.length > 0 && rows.map((row, index) => {
                        const rowTasks = [];
                        tasks.forEach((task) => {
                            if(task.rowID === row.id) {
                                rowTasks.push(task)
                            }
                        })
                        console.log(row)
                        return (
                            <Row
                            tasks={rowTasks}
                            allTasks={tasks}
                            setAllTasks={setTasks}
                            rowID={row.id}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            title={row.title}
                            rows={rows}
                            setRows={setRows}
                            key={index}
                            />
                        )
                    })}
                    <NewRow rows={rows} setRows={setRows} />
                </div>
            </div>
        </div>
    )
}

export default Kanban;