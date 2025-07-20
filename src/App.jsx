// import { useState } from 'react'
import './App.css'
import Header from './User_Components/Header'
import LeftSide from './User_Components/LeftSide'
import RightSide from './User_Components/RightSide'
import Footer from './User_Components/Footer'
import LoginPage from './pages/LoginPage'
import Dashboard from './Admin_Components/Dashboard'
import AdminHeader from './Admin_Components/Admin_Header'
import UserTable from './Admin_Components/All_Users'
import AddUserForm from './Admin_Components/Add_User'
import CategoryTable from './Admin_Components/All_Category'
import PostTable from './Admin_Components/All_Articles'
import WebsiteSettingsForm from './Admin_Components/WebsiteSettingForm'
import CommentSection from './User_Components/CommentSection'
import User_Layout from './User_Components/User_Layout'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ViewNews from './User_Components/ViewNews'
import Admin_Layout from './Admin_Components/Admin_Layout'
import CommentsTable from './Admin_Components/All_Comments'
import Add_Article from './Admin_Components/Add_Article'
import AddCategoryForm from './Admin_Components/Add_Category'
import Update_Article from './Admin_Components/Update_Article'
import axios from './Utility_Component/axiosInstancs';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { applyTheme, setCurrentUser, setDashboardData, setIsLoggedIn, setSettingsData } from './store/features/frontendSlice.js'
import AuthLayout from './Utility_Component/Auth.jsx'
import NotFoundPage from './Utility_Component/PageNotFound.jsx'
import AdminLayout from './Utility_Component/IsAdminLayout.jsx'
import { setArticles } from './store/features/userSlice.js'
import Specific from './User_Components/Specific.jsx'
import Subscribe from './User_Components/Subscribe.jsx'
function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.frontend.isLoggedIn)

  //initila data fetching works 
  useEffect(() => {

    const fetchCounts = async function () {
      try {
        const response = await axios.get("/admin/dashboard", {
          withCredentials: true
        });
        dispatch(setDashboardData(response.data.data));
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error.message);
      }
    };

    const fetchSettings = async function () {
      try {
        const response = await axios.get("/admin/settings", {
          withCredentials: true
        });
        // console.log("Settings Data:", response.data.data); 
        dispatch(setSettingsData(response.data.data));
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error.message);
      }

      dispatch(applyTheme())
    };

    const getUserData = async function () {
      try {
        const response = await axios.get("/admin/currUser", {
          withCredentials: true
        });
        dispatch(setCurrentUser(response.data.data));
        dispatch(setIsLoggedIn(true));
      } catch (error) {
        dispatch(setIsLoggedIn(false));
        console.error("Failed to fetch dashboard stats:", error.message);
      }
    }

    dispatch(applyTheme())

    fetchCounts()
    fetchSettings()
    getUserData()
  }, [isLoggedIn, dispatch]);

  // const [count, setCount] = useState(0)
  function Home() {
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await axios.get('https://newsnowbackend-production.up.railway.app/api/articles');
          dispatch(setArticles(response.data.data));
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      };

      fetchArticles();
    }, []);
    return (
      <div className='flex lg:gap-4 flex-col md:px-10 lg:flex-row lg:px-10 xl:px-32 2xl:px-40 py-10'>
        <div className='flex-2/3'>
          <LeftSide classes={''} />
        </div>
        <RightSide classes={'basis-[35%] mt-10 lg:mt-0'} />
      </div>
    )
  }
  function News() {
    const [comments, setComments] = useState([]);
    const [articleId, setArticleId] = useState('');
    return (
      <div className='flex lg:gap-4 flex-col md:px-10 lg:flex-row lg:px-10 xl:px-32 2xl:px-40 py-10 '>
        <div className='flex-2/3'>
          <ViewNews setComments={setComments} setArticleId={setArticleId} />
          {
            comments &&
            <CommentSection articleId={articleId}/>
          }
        </div>
        {/* <RightSide classes={'flex- lg:flex-1 mt-10 lg:mt-0'} /> */}
        <RightSide classes={'basis-[35%] mt-10 lg:mt-0'} />
      </div>
    )
  }
  function Search() {
    return (
      <div className='flex lg:gap-4 flex-col md:px-10 lg:flex-row lg:px-10 xl:px-32 2xl:px-40 py-10 '>

        <Specific classes={'mx-2 sm:mx-10 md:mx-auto max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'} searchWise />

        <RightSide classes={'basis-[35%] mt-10 lg:mt-0'} />
      </div>
    )
  }
  // const keywords = useSelector((state) => state.userSlice.searchArray)

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* 🌐 Public Website */}
          <Route path="/" element={<User_Layout />}>
            <Route index element={<Home />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/category/:parameter" element={<User_Layout />}>
            <Route index element={<Specific classes={'my-10 mx-2 sm:mx-10 md:mx-auto max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'} categorywise />} />
          </Route>

          <Route path="/author/:parameter" element={<User_Layout />}>
            <Route index element={<Specific classes={'my-10 mx-2 sm:mx-10 md:mx-auto max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl'} authorWise />} />
          </Route>

          <Route path="/article/:slug" element={<User_Layout />}>
            <Route index element={<News />} />
          </Route>

          <Route path="/search" element={<User_Layout />}>
            <Route index element={<Search />} />
            <Route path=":keyword" element={<Search />} />
          </Route>

          {/* 🔐 Public Auth Pages */}
          <Route path="/login" element={
            <AuthLayout authentication={false}>
              <LoginPage />
            </AuthLayout>
          } />

          {/* 🔐 Admin Auth Pages */}
          <Route path="/admin/login" element={
            <AuthLayout authentication={false}>
              <LoginPage adminLogin={true} />
            </AuthLayout>
          } />

          {/* 🔐🛡 Admin Protected Area */}
          <Route path="/admin" element={
            <AuthLayout authentication={true}>
              <Admin_Layout />
            </AuthLayout>
          }>
            {/* 🧭 Admin Dashboard */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* 📰 Articles */}
            <Route path="articles">
              <Route index element={<PostTable />} />
              <Route path="add" element={<Add_Article />} />
              <Route path="update/:_id" element={<Update_Article />} />
            </Route>

            {/* 🧑‍💼 Users (Admin Only) */}
            <Route path="users" element={
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            }>
              <Route index element={<UserTable />} />
              <Route path="add" element={<AddUserForm />} />
              <Route path="update/:_id" element={<AddUserForm />} />
            </Route>

            {/* 🗂 Categories (Admin Only) */}
            <Route path="categories">
              <Route index element={<CategoryTable />} />
              <Route path="add" element={<AddCategoryForm />} />
              <Route path="update/:_id" element={<AddCategoryForm />} />
            </Route>

            {/* ⚙️ Settings (Admin Only) */}
            <Route path="settings" element={
              <AdminLayout>
                <WebsiteSettingsForm />
              </AdminLayout>
            } />

            {/* 💬 Comments (Optional: You can guard this too) */}
            <Route path="comments" element={<CommentsTable  />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>

  )
}

export default App
