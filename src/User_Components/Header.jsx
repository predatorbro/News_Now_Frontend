import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFilter } from "../store/features/userSlice";
import { useEffect } from "react";
import axios from "../Utility_Component/axiosInstancs";
import { useState } from "react";
import { setCategory } from "../store/features/userSlice";

import '../App.css'
function PageLink({ path, text }) {
    const dispatch = useDispatch();
    return (
        <Link to={"/"} key={path} className="hover:text-gray-300 dark:hover:text-gray-400" onClick={() => dispatch(setFilter(text))}>{text}</Link>
    )
}
function Header() {
    const dispatch = useDispatch();
    const [categories, setCat] = useState(JSON.parse(localStorage.getItem('categoryInUse')) || [])

    useEffect(() => {
        axios.get("/api/category", { withCredentials: true })
            .then(response => {
                setCat(response.data.data);
                dispatch(setCategory(response.data.data));
            }).catch(error => {
                console.log(error)
            })
    }, [dispatch])

    const staticLinks = [
        { path: '/', text: 'Home' },
    ];

    const dynamicCategoryLinks = categories?.map((cat) => ({
        path: `/${cat.slug}`,
        text: cat.name,
    })) || [];

    const links = [...staticLinks, ...dynamicCategoryLinks];

    const settings = useSelector((state) => state.frontend.settingsData);

    const subscribed = JSON.parse(localStorage.getItem('subscribed'));
    const [mobileOpen, setMobileOpen] = useState(false);



    const handleLinkClick = () => {
        if (mobileOpen) setMobileOpen(false); // Close mobile nav on link click
    };

    return (
        <nav className="bg-[var(--primary)] text-white flex flex-col w-full">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full max-w-7xl px-4 py-3 mx-auto">
                {/* Logo */}
                <div className="text-2xl md:text-4xl font-bold flex gap-3 items-center">
                    <div className={`${settings.image ? "w-10 h-10 md:w-14 md:h-14" : ""} rounded-full overflow-hidden`}>
                        {settings.image ? (
                            <img
                                className="object-cover w-full h-full"
                                src={`https://newsnowbackend-production.up.railway.app/${settings?.image.replace("public\\", "").replace("public/", "")}`}
                                alt="Logo"
                            />
                        ) : (
                            <p>{settings?.websiteName || "News Now"}</p>
                        )}
                    </div>
                    <p className="hidden sm:block">{settings?.websiteName && settings?.image && settings?.websiteName}</p>
                </div>

                {/* Desktop Subscribe Button */}
                <button
                    onClick={!subscribed ? () => (window.location.href = "/subscribe") : undefined}
                    className={`hidden sm:flex items-center flex-col text-sm px-3 py-1 rounded outline-none border-none transition cursor-pointer
            ${subscribed
                            ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                            : "bg-white text-[var(--primary)] hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                >
                    <div className="flex gap-2 items-center justify-center">
                        <i className="fa-regular fa-arrow-right-from-bracket"></i>
                        {subscribed ? "Subscribed" : "Subscribe"}
                    </div>
                    <div className="text-[10px]">to our newsletter</div>
                </button>

                {/* Burger Menu */}
                <button onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden text-white text-xl">
                    {mobileOpen ? <i className="fa-solid fa-xmark"></i> : < i className="fa-solid fa-bars"></i>}
                </button>
            </div>

            {/* Desktop Nav (scrollable) */}
            <div className="relative hidden sm:block">
                <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none"></div>
                <div className="relative z-10 overflow-x-auto whitespace-nowrap px-4 seamless-scrollbar">
                    <ul className="flex justify-center space-x-6 py-3 text-sm font-semibold uppercase min-w-max">
                        {links.map((elem, index) => (
                            <li key={index} onClick={handleLinkClick}>
                                <PageLink path={elem.path} text={elem.text} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Mobile Nav */}
            {mobileOpen && (
                <ul className="flex flex-col sm:hidden bg-[var(--primary)] px-6 pb-4 text-sm font-medium uppercase space-y-3">
                    {links.map((elem, index) => (
                        <li key={index} onClick={handleLinkClick}>
                            <PageLink path={elem.path} text={elem.text} />
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={!subscribed ? () => (window.location.href = "/subscribe") : undefined}
                            className={`w-full text-left mt-2 px-3 py-2 rounded transition
                ${subscribed
                                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                                    : "bg-white text-[var(--primary)] hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {subscribed ? "Subscribed" : "Subscribe to newsletter"}
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Header;
