import { useState } from "react";
import { Menu, Search, Bell, User } from "lucide-react";
import Sidebar from "./SidebarLeft";
import AvatarComponent from "./Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "./DropdownMenu";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import { toggleSidebar } from "@/redux/sidebarSlice";
import CreateDropdown from "./createDropdown";
import { setSearch } from "@/redux/filterSlice";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const search = useSelector((state) => state.filter.search);
  if (loading) return <Loading />;

  return (
    <main className="fixed top-0 left-0 right-0 z-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <header className="bg-background text-text p-2 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="p-2 pl-5 hover:bg-hover rounded-full hidden lg:block"
            onClick={() => {
              dispatch(toggleSidebar());
              setIsExpanded(!isExpanded);
            }}
          >
            <Menu size={24} />
          </button>
          <Link to="/">
            <img
              className="w-10 h-10 cursor-pointer ml-4 sm:block"
              src="https://img.icons8.com/color/48/youtube-play.png"
              alt="youtube-play"
            />
          </Link>
          <Link to="/">
            <h1
              className={`text-xl lg:text-2xl font-semibold font-roboto cursor-pointer ${
                isSearchVisible ? "hidden" : "block"
              }`}
            >
              YouTube
            </h1>
          </Link>
        </div>

        <div
          className={`flex-grow mx-4 ${
            isSearchVisible ? "flex" : "hidden sm:flex"
          }`}
        >
          <div className="flex w-full max-w-[640px] mx-auto">
            <input
              type="search"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search"
              className="w-full px-4 py-2 bg-background border border-border rounded-l-full focus:outline-none focus:border-youtube-blue"
            />
            <button className="px-6 py-2 bg-button-bg hover:bg-button-hover border border-l-0 border-border rounded-r-full">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="p-2 hover:bg-hover rounded-full sm:hidden"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search size={24} />
          </button>
          {isLoggedIn ? (
            <>
              <div className="p-2 hover:bg-hover rounded-full hidden sm:block">
                <CreateDropdown />
              </div>
              <div className="p-2 hover:bg-hover rounded-full hidden sm:block">
                <Bell size={24} />
              </div>
              <div className="p-2 hover:bg-hover rounded-full lg:mr-4">
                <AvatarComponent />
              </div>
            </>
          ) : (
            <>
              <Dropdown />
              <Link
                to="/sign-in"
                className="flex items-center text-blue-500 gap-2 p-2 mr-2 hover:bg-button-hover rounded-full border border-border"
              >
                <User size={24} />
                <p>Sign In</p>
              </Link>
            </>
          )}
        </div>
      </header>
    </main>
  );
};

export default Header;
