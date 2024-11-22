import { Outlet } from "@remix-run/react";
import Nav from "../components/Nav";
import { redirect } from "@remix-run/node";

export const loader = async () => {
  return redirect("/home");
};

export default function Index() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav />
      <Outlet />
    </div>
  );
}