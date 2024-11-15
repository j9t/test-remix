import Nav from "./_index";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Nav />
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">About</h1>
          <p className="text-lg">Learn more about our team and mission.</p>
        </header>
        <main>
          <p className="text-center">This is the About page.</p>
        </main>
      </div>
    </div>
);
}