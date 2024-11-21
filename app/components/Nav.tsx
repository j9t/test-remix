import { Link } from "@remix-run/react";

const navItems = [
  { href: "/home", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" },
];

function Nav() {
  return (
    <nav className="flex justify-center space-x-4 p-4 bg-gray-800 text-white">
      {navItems.map((item) => (
        <Link key={item.href} to={item.href} className="hover:underline">
          {item.text}
        </Link>
      ))}
    </nav>
  );
}

export default Nav;