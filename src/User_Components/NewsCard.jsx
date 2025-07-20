import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
function NewsCard({ article }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  const truncateHTML = (htmlString, limit = 100) => {
    const plainText = htmlString.replace(/<[^>]+>/g, ""); // Remove HTML tags
    const trimmed = plainText.length > limit ? plainText.slice(0, limit) + "..." : plainText;
    return parse(trimmed); // Parse as JSX again (now safe)
  };
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-md p-4 flex flex-col md:flex-row gap-4 transition">
      {/* Image */}
      <div className="w-full md:w-44 h-44 shrink-0">
        <img
          src={`https://newsnowbackend-production.up.railway.app/${article.image.replace("public\\", "").replace("public/", "")}`}
          alt="News"
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        {/* Title */}
        <h2 className="text-xl font-semibold text-[var(--primary)] mb-1 hover:underline cursor-pointer" onClick={() => navigate(`/article/${article.slug}`)}>
          {article.title}
        </h2>

        {/* Meta info */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-x-4 mb-2 flex flex-wrap gap-y-1">
          <span className="inline-flex items-center gap-1">
            <i className="fas fa-tag text-[var(--primary)]"></i> {article.category.name}
          </span>
          <span className="inline-flex items-center gap-1 cursor-pointer" onClick={() => navigate(`/author/${article.author.username}`)}>
            <i className="fas fa-user text-[var(--primary)]"></i> {article.author.fullName}
          </span>
          <span className="inline-flex items-center gap-1">
            <i className="fas fa-calendar-alt text-[var(--primary)]"></i> {formatDate(article.createdAt)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {truncateHTML(article?.content, 200)}
        </p>

        {/* Read More button */}
        <div>
          <button
            className="inline-block bg-[var(--primary)] hover:opacity-80 text-white text-sm px-4 py-2 rounded transition cursor-pointer"
            onClick={() => navigate(`/article/${article.slug}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
