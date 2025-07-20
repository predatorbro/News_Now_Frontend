import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser'

const ViewNews = ({ setComments, setArticleId }) => {
    const { slug } = useParams();
    const [article, setArticle] = useState(JSON.parse(localStorage.getItem("lastArticle")) || {});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://newsnowbackend-production.up.railway.app/api/single/${slug}`)
            .then((res) => {
                setArticle(res.data.data)
                setArticleId(res.data.data._id)
                localStorage.setItem("lastArticle", JSON.stringify(res.data.data))
            })
            .catch((err) => {
                console.log(err)
                setError(err)
                setComments("")
            });
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // optional: 'auto' or 'smooth'
        });
    }, [slug, setComments, setArticleId]);

    // console.log(error.response.data.message)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    if (error || !article || Object.keys(article).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] px-4">
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 px-6 py-4 rounded shadow-md text-center max-w-xl w-full">
                    {error?.response?.data?.errors?.[0]?.message ||
                        error?.response?.data?.message ||
                        "Loading..."}
                </div>
            </div>
        );
    }


    return (
        article && (
            <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100   rounded-lg  shadow-lg">
                {/* Main Article */}
                <article className="  dark:bg-gray-800 p-6">
                    <img
                        src={`https://newsnowbackend-production.up.railway.app/${article?.image?.replace("public\\", "").replace("public/", "")}`}
                        alt="Main News"
                        className="w-full h-64 md:h-120 object-cover rounded-md"
                    />

                    <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4 mt-6 flex flex-wrap gap-y-1">
                        <span className="inline-flex items-center gap-1">
                            <i className="fas fa-tag text-[var(--primary)]"></i> {article?.category?.name}
                        </span>
                        <span
                            className="inline-flex items-center gap-1 cursor-pointer"
                            onClick={() => navigate(`/author/${article?.author.username}`)}
                        >
                            <i className="fas fa-user text-[var(--primary)]"></i> {article?.author?.fullName}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <i className="fas fa-calendar-alt text-[var(--primary)]"></i> {formatDate(article?.createdAt)}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mt-3 text-gray-900 dark:text-white">
                        {article?.title}
                    </h2>
                    <p className="mt-4 text-gray-800 dark:text-gray-300 leading-relaxed">
                        {typeof article?.content === 'string' ? parse(article.content) : null}
                    </p>
                </article>
            </div>
        )
    );

};

export default ViewNews;