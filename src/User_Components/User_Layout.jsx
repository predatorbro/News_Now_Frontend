
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function User_Layout({ classes }) {
    return (
        <div className={`${classes} home mx-auto min-h-screen  `}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default User_Layout