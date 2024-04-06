import './Menu.css';

const Menu = () => {
    return (
        <div className='menu d-flex flex-column h-100'>
            <h3>kanban</h3>
            <div className='d-flex flex-column'>
                <h5>All Boards</h5>
                <ul>
                    <li>
                        <span>Platform launch</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu;