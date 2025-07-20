
import { useSelector } from "react-redux";

const Dashboard = () => {
    const dashboardData = useSelector((state) => state.frontend.dashboardData);
    const color = ["bg-red-100", "bg-pink-100", "bg-yellow-100"];
    const dashboardInfo = [
        {
            title: "Articles",
            count: dashboardData?.articleCount,
            icon: "fa-newspaper"
        },
        {
            title: "Categories",
            count: dashboardData?.categoryCount,
            icon: "fa-layer-group"
        },
        (dashboardData?.user.role === 'admin') && {
            title: "Users",
            count: dashboardData?.userCount,
            icon: "fa-users"
        }
    ];



    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-900 transition">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                <span className="text-3xl">📦</span>
                <span>Dashboard</span>
                <span className="text-base font-normal text-gray-600 dark:text-gray-300">
                    | Hello <span className="text-[var(--primary)] ">{dashboardData?.user.fullName}</span>
                </span>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dashboardInfo.map((info, index) => (info && (
                    <div
                        key={index}
                        className={`rounded-lg p-4 shadow-md flex items-start gap-4 transition ${color[index % color.length]} dark:bg-gray-800 text-gray-800 dark:text-white`}
                    >
                        <i className={`fa-light text-5xl md:text-6xl ${info.icon}`}></i>
                        <div>
                            <div className="text-lg font-medium">{info.title}</div>
                            <div className="text-2xl font-semibold">{info.count}</div>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
};

export default Dashboard;
