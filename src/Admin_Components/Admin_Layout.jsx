import AdminHeader from './Admin_Header'
import { Outlet } from 'react-router-dom'

function Admin_Layout() {
    return (
        <div>
            <AdminHeader />
            <Outlet />
        </div>
    )
}

export default Admin_Layout