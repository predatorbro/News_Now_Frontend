import { useEffect, useState } from "react";
import RecentPostItem from "./RecentPostBox";

function RecentPosts({ articlesList = [] }) {
    const [posts, setArticles] = useState(JSON.parse(localStorage.getItem('LatestArticles')) || [])

    useEffect(() => {
        setArticles(articlesList);
    }, [articlesList]);



    return (
        <div className="bg-gray-50 dark:bg-gray-900 shadow-md p-4 rounded">
            <h2 className="text-lg font-bold border-l-4 border-[var(--primary)] pl-2 mb-4 text-gray-800 dark:text-white">
                RECENT POSTS
            </h2>

            <div className="w-full flex flex-wrap gap-4">
                {posts?.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No posts available.</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="w-full sm:w-[48%] lg:w-full">
                            <RecentPostItem post={post} />
                        </div>
                    ))
                )}
            </div>
        </div>

    );
}

export default RecentPosts;
