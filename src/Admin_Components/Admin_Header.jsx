import axios from '../Utility_Component/axiosInstancs';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../store/features/frontendSlice";

// 🍪 Utility to read cookies

// const getCookie = (name) => {
//     const cookies = document.cookie.split("; ");
//     const found = cookies.find(row => row.startsWith(name + "="));
//     return found ? found.split("=")[1] : null;
// };

function AdminHeader() {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.frontend.isLoggedIn)
    const dispatch = useDispatch()
    // 🔒 Logout function
    const logout = async () => {
        try {
            await axios.get('/admin/logout', {}, {
                withCredentials: true,
            });
            console.log('Logout successful');
            localStorage.clear()
            dispatch(setIsLoggedIn(false));
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    };

    const settings = useSelector((state) => state.frontend.settingsData);
    const currentUser = useSelector((state) => state.frontend.currentUser.role);
    const isAdmin = (currentUser)?.toUpperCase() === "ADMIN"
    const adminNavLinks = [
        { name: "Home", to: "/admin", show: true },
        { name: "Articles", to: "/admin/articles", show: true },
        { name: "Categories", to: "/admin/categories", show: true },
        { name: "Users", to: "/admin/users", show: isAdmin },
        { name: "Comments", to: "/admin/comments", show: true },
        { name: "Settings", to: "/admin/settings", show: isAdmin },
    ];

    return (
        <nav className="bg-[var(--primary)] text-white flex flex-col items-center w-full">
            {/* Top bar */}
            <div className="flex justify-between items-center w-full max-w-7xl px-6 py-4">
                <div className="text-3xl md:text-5xl font-bold flex gap-3 items-center">
                    <div className={settings.image && "w-15 h-15 rounded-full overflow-hidden"}>
                        {
                            settings.image ?
                                <img className="object-cover w-full h-full"
                                    src={`https://newsnowbackend-production.up.railway.app/${settings?.image.replace("public\\", "").replace("public/", "")}`}
                                    alt="" />
                                :
                                <p className="">{settings?.websiteName || 'News Now'}</p>
                        }
                    </div>
                    <p className="">{(settings?.websiteName && settings?.image) && settings?.websiteName}</p>
                </div>
                {isLoggedIn ? (
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-sm md:text-base bg-white text-[var(--primary)] px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <i className="fa-regular fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/admin/login')}
                        className="flex items-center gap-2 text-sm md:text-base bg-white text-blue-500 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <i className="fa-solid fa-sign-in-alt"></i>
                        Login
                    </button>
                )}
            </div>

            {/* Navigation links */}
            <div className="relative w-full">
                <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>

                <ul className="relative z-10 flex flex-wrap justify-center gap-4 px-4 py-3 text-sm font-semibold uppercase">
                    {adminNavLinks.map((link) =>
                        link.show && (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="hover:text-gray-300 dark:hover:text-gray-400"
                            >
                                {link.name}
                            </Link>
                        )
                    )}
                </ul>

            </div>
        </nav>
    );
}

export default AdminHeader;
