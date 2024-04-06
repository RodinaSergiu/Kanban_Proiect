import './NewRow.css';
import { useState } from 'react';

const NewRow = ({rows, setRows}) => {
    const [newRow, setNewRow] = useState({
        id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 0,
        title: ''
    });


    const updateRowTitle = (title) => {
        console.log(title)
        setNewRow({...newRow, title: title})
    }

    const handleNewRow = () => {
        if(newRow !== '') {
            const localStorageRows = [...rows, newRow]
            localStorage.setItem('rows', JSON.stringify(localStorageRows))
            setRows([...rows, newRow])
            setNewRow({id: newRow.id + 1, title: ''});
        }
    }
    
    return (
        <div className='task-row new-row bg-hero-transparent p-4 d-flex justify-content-center'>
            <div className='new-row-container d-flex justify-content-center align-items-center'>
                                        {/* onChange={(e) => setNewRow({...newRow, title: e.target.value})}  */}
                                        {/* onChange={(e) => updateRowTitle(e.target.value)}  */}
                <input value={newRow.title} onChange={updateRowTitle}  type='text' className='add-row' placeholder='New row...' />
                <span onClick={() => handleNewRow()} className='add-row-btn cursor-pointer'>+</span>
            </div>
        </div>
    )
}

export default NewRow;