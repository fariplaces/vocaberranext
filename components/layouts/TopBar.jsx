import { toggleSidebar } from "@/store/slices/skillSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


const TopBar = ({ handleNotifictionToggle }) => {
  const pathname = usePathname();
  const { sideMenu, sidebarOpen } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  // 1. Extract the ID from the URL (assuming /skills/[id])
  const pathParts = pathname.split("/");
  const currentId = pathParts[pathParts.length - 1];

  // 2. Recursive function to find the breadcrumb path
  const findPath = (items, targetId, currentPath = []) => {
    for (const item of items) {
      // Check if it's a Skill, Category, or Child (Sub-Category)
      const label = item.title || item.name || item.item;
      const newPath = [...currentPath, { label, id: item.id }];

      if (item.id === targetId) return newPath;

      // Check nested levels
      if (item.categories) {
        const found = findPath(item.categories, targetId, newPath);
        if (found) return found;
      }
      if (item.children) {
        const found = findPath(item.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  const breadcrumbs = findPath(sideMenu, currentId) || [];

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())} // Using Redux Toggle
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {sidebarOpen ? <PanelLeft className="w-5 h-5" /> : <PanelRight className="w-5 h-5" />}
          </button>

          {/* Dynamic Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <Link href="/" className="text-gray-400 hover:text-white">Dashboards</Link>

            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.id}>
                <span className="text-gray-600">/</span>
                <Link
                  href={`/skills/${crumb.id}`}
                  className={`transition-colors ${index === breadcrumbs.length - 1
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ... rest of your TopBar JSX */}
      </div>
    </header>
  );
};
export default TopBar