import { useSelector } from 'react-redux';
import NewsCard from './NewsCard';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LeftSide({ classes }) {
  const [articles, setArticles] = useState(localStorage.getItem('UserArticles') ? JSON.parse(localStorage.getItem('UserArticles')) : [])
  const articlesList = useSelector((state) => state.userSlice.articles)
  const filter = useSelector((state) => state.userSlice.filter)
  const navigate = useNavigate();
  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  // show filtered articles only if there is a filter
  if (filter && filter !== "Home") return (
    <div
      className={`flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md w-full ${classes}`}
    >
      <div className="relative w-full border-b-2 border-gray-300 dark:border-gray-600 text-2xl font-semibold dark:text-gray-100 text-gray-800 pb-2">Filter : {filter}

        <button
          onClick={() => navigate(`/category/${filter}`)}
          className="cursor-pointer absolute right-0 inline-block 
          bg-gray-100/60 hover:bg-gray-200/60 
          dark:bg-white/10 dark:hover:bg-white/20 
          backdrop-blur-md 
          text-gray-800 dark:text-white 
          text-sm px-4 py-2 rounded-md transition"
        >
          See more...
        </button>
      </div>

      {articles?.map((article) => (article.category.name === filter &&
        <NewsCard key={article._id} article={article} />
      ))}
      {/* <Pagination /> */}
    </div>
  );

  // show all articles
  return (
    <div
      className={`flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md   ${classes}`}
    >
      <div className="relative w-full border-b-2 border-gray-300 dark:border-gray-600 text-2xl font-semibold dark:text-gray-100 text-gray-800 pb-2">
        Home - Most Popular
      </div>
      {articles?.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
      <Pagination />
    </div>
  );
}

export default LeftSide;