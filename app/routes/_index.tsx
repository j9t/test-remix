import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "@remix-run/react";
import Nav from "../components/Nav";

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav />
      <Outlet />
    </div>
  );
}