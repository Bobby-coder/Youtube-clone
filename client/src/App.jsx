import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import BottomNavbar from "./components/BottomNav"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "./redux/userSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchUserData());
    }
  }, [dispatch]);

  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Outlet />
      <BottomNavbar /> 
    </>
  )
}

export default App
