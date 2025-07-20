import NewsCard from './NewsCard';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../store/features/userSlice';

function Specific({ classes, categorywise = false, authorWise = false, searchWise = false }) {
    const [articles, setArticles] = useState([])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { parameter } = useParams();
    const { keyword } = useParams();

    const keywords = useSelector((state) => state.userSlice.searchArray)
    if (searchWise && keywords.length == 0) {
        dispatch(setSearch(keyword?.split('-').join(' ')))
        if (keyword == undefined) dispatch(setSearch(''))
    }

    useEffect(() => {
        if (categorywise) { 
            axios.get(`https://newsnowbackend-production.up.railway.app/api/category/${parameter}`)
                .then((res) => {
                    setArticles(res.data.data)
                })
                .catch((err) => console.log(err))
        }
        if (authorWise) {
            axios.get(`https://newsnowbackend-production.up.railway.app/api/author/${parameter}`)
                .then((res) => {
                    setArticles(res.data.data)
                    console.log(res.data.data)
                })
                .catch((err) => console.log(err))
        }
        if (searchWise && keywords.length > 0) {
            navigate(`/search/${keywords.join('-')}`)
            axios.post("https://newsnowbackend-production.up.railway.app/api/search", { keywords })
                .then((res) => {
                    setArticles(res.data.data) 
                })
                .catch((err) => console.error(err))
        }
    }, [categorywise, parameter, authorWise, searchWise, keywords, navigate]);

    return (
        <div className='min-h-[80vh] flex-1'>
            <div
                className={`flex flex-col gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md   ${classes}`}
            >
                <div className="w-full border-b-2 border-gray-300 dark:border-gray-600 text-2xl font-semibold dark:text-gray-100 text-gray-800 pb-2">
                    <p>Filter for : {!searchWise && parameter} {searchWise && keywords.join(" ")} {(searchWise && keywords?.[0] == "") && "All articles"}</p>
                </div>

                {articles?.map((article) => (
                    <NewsCard key={article?._id} article={article} />
                ))}

                {
                    articles?.length === 0 &&
                    <p className='text-center text-2xl font-semibold dark:text-gray-100 text-gray-800'>No articles found</p>
                }
                {/* <Pagination /> */}
            </div>
        </div>
    );
}

export default Specific