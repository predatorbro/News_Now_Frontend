import { useEffect, useState } from "react"; 
import RecentPosts from "./RecentPostList";
import SearchBox from "./Search";
import { useDispatch } from "react-redux";
import { setLatestArticles } from "../store/features/userSlice";
import axios from "../Utility_Component/axiosInstancs";

function RightSide({ classes }) {
  const [articles, setArticles] = useState(JSON.parse(localStorage.getItem('LatestArticles')) || [])
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsnowbackend-production.up.railway.app/api/latest');
        dispatch(setLatestArticles(response.data.data));
        setArticles(response.data.data);
        localStorage.setItem('LatestArticles', JSON.stringify(response.data.data));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [dispatch]);

  return (
    <div
      className={`flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md w-full ${classes}`}
    >
      <SearchBox />
      <RecentPosts articlesList={articles} />
    </div>
  );
}

export default RightSide;
