import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const FooterButton = ({ label, onClick }) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: "bg-blue-500 text-white py-2 px-4 rounded-full text-lg",
      children: label
    }
  );
};
const Footer = () => {
  const handleClick = () => {
    window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
  };
  return /* @__PURE__ */ jsx("footer", { className: "w-full py-4 bg-gray-800 text-center", children: /* @__PURE__ */ jsx(FooterButton, { label: "Get me out of here", onClick: handleClick }) });
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const navItems = [
  { href: "/home", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" }
];
function Nav() {
  return /* @__PURE__ */ jsx("nav", { className: "flex justify-center space-x-4 p-4 bg-gray-800 text-white", children: navItems.map((item) => /* @__PURE__ */ jsx(Link, { to: item.href, className: "hover:underline", children: item.text }, item.href)) });
}
const loader = async () => {
  return redirect("/home");
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "Contact" }
  ];
};
function Contact() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ jsx(Index, {}),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Contact" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Get in touch with us." })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("p", { className: "text-center", children: "This is the Contact page." }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "About" }
  ];
};
function About() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ jsx(Index, {}),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "About" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Learn more about our team and mission." })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("p", { className: "text-center", children: "This is the About page." }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "JavaScript Tips and Tricks" },
    { name: "description", content: "Learn some useful JavaScript tips and tricks!" }
  ];
};
const tips = [
  {
    title: "Destructuring Assignment",
    description: "Extract values from arrays or properties from objects into distinct variables.",
    code: `const { name, age } = person;`
  },
  {
    title: "Template Literals",
    description: "Create strings with embedded expressions.",
    code: "const greeting = `Hello, ${name}!`;"
  },
  {
    title: "Arrow Functions",
    description: "Shorter syntax for function expressions.",
    code: "const add = (a, b) => a + b;"
  }
];
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100", children: [
    /* @__PURE__ */ jsx(Index, {}),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "JavaScript Tips and Tricks" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Enhance your JavaScript skills with these useful tips." })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("ul", { className: "space-y-8", children: tips.map((tip) => /* @__PURE__ */ jsxs("li", { className: "p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2", children: tip.title }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", children: tip.description }),
        /* @__PURE__ */ jsx("pre", { className: "bg-gray-100 dark:bg-gray-700 p-4 rounded", children: /* @__PURE__ */ jsx("code", { children: tip.code }) })
      ] }, tip.title)) }) })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D8ynw2WN.js", "imports": ["/assets/components-CBj-1S-c.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B9yfVBHX.js", "imports": ["/assets/components-CBj-1S-c.js", "/assets/Footer-DNTTuIT6.js"], "css": ["/assets/root-BTBwOf2M.css"] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/contact-UZ_UhwD8.js", "imports": ["/assets/components-CBj-1S-c.js", "/assets/_index-DHpqx5EQ.js", "/assets/Footer-DNTTuIT6.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DHpqx5EQ.js", "imports": ["/assets/components-CBj-1S-c.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-BeOFNtSF.js", "imports": ["/assets/components-CBj-1S-c.js", "/assets/_index-DHpqx5EQ.js", "/assets/Footer-DNTTuIT6.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-KZKZWf-k.js", "imports": ["/assets/components-CBj-1S-c.js", "/assets/_index-DHpqx5EQ.js"], "css": [] } }, "url": "/assets/manifest-ab2cf478.js", "version": "ab2cf478" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false, "unstable_routeConfig": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
