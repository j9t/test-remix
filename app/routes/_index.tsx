import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "JavaScript Tips and Tricks" },
    { name: "description", content: "Learn some useful JavaScript tips and tricks!" },
  ];
};

const tips = [
  {
    title: "Destructuring Assignment",
    description: "Extract values from arrays or properties from objects into distinct variables.",
    code: `const { name, age } = person;`,
  },
  {
    title: "Template Literals",
    description: "Create strings with embedded expressions.",
    code: "const greeting = `Hello, ${name}!`;",
  },
  {
    title: "Arrow Functions",
    description: "Shorter syntax for function expressions.",
    code: "const add = (a, b) => a + b;",
  },
];

const navItems = [
  { href: "/", text: "Home" },
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

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav />
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">JavaScript Tips and Tricks</h1>
          <p className="text-lg">Enhance your JavaScript skills with these useful tips.</p>
        </header>
        <main>
          <ul className="space-y-8">
            {tips.map((tip) => (
              <li key={tip.title} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{tip.title}</h2>
                <p className="mb-4">{tip.description}</p>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <code>{tip.code}</code>
                </pre>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}