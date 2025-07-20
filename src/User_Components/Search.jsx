import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.userSlice.searchArray)
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 shadow-md p-4 rounded w-full">
      <h2 className="text-lg font-bold border-l-4 border-[var(--primary)] pl-2 mb-4 text-gray-800 dark:text-white">
        SEARCH
      </h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-l focus:outline-none"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          value={useSelector((state) => state.userSlice.searchArray.join(' '))}
        />
        <button className="bg-[var(--primary)] hover:opacity-80 text-white px-4 py-2 rounded-r transition" onClick={() => navigate(`/search/${keywords.join('-')}`)}  >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBox; 