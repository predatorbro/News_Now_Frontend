import { useNavigate } from "react-router-dom";

function RecentPostItem({ post, classes }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const navigate = useNavigate();
  return (
    <>
      <div className={`${classes} flex gap-4 my-4  `}>
        <img
          src={`https://newsnowbackend-production.up.railway.app/${post.image.replace("public\\", "").replace("public/", "")}`}
          alt="post" className="w-full h-20 object-cover rounded overflow-hidden flex-1/3" />
        <div className="flex flex-col justify-between flex-2/3">
          <h3 className="text-[var(--primary)] text-sm font-medium hover:underline cursor-pointer"
            onClick={() => navigate(`/article/${post.slug}`)}
          >
            {post.title.length > 50 ? post.title.slice(0, 50) + "....." : post.title}
          </h3>
          <div className="text-xs text-gray-500 space-x-2">
            <span className="inline-flex items-center gap-1 cursor-pointer"
              onClick={() => navigate(`/author/${post.author.username}`)}>
              <i className="fas fa-tag text-[var(--primary)] "></i> {post.author.fullName}
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="fas fa-calendar-alt text-[var(--primary)]"></i> {formatDate(post.createdAt)}
            </span>
          </div>
          <button
            onClick={() => navigate(`/article/${post.slug}`)}
            className=" cursor-pointer text-[10px] bg-gray-200 text-gray-700 px-2 py-[0.5px] mt-1 rounded w-fit hover:bg-gray-300">
            Read More
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-300 h-[1px] dark:bg-gray-600"></div>
    </>
  );
}

export default RecentPostItem;
