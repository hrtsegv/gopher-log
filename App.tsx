import { lazy, Suspense, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Writing } from "./pages/Writing";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { About } from "./pages/About";
import { getPostBySlug } from "./lib/markdown";
import { Layout } from "./components/Layout";
import { projects } from "./data/projects";

const Post = lazy(() =>
  import("./pages/Post").then((module) => ({ default: module.Post })),
);

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Abdallah Aladdin — Backend Developer",
      "/writing": "GopherLog — hrtsegv",
      "/projects": "Projects — hrtsegv",
      "/about": "About — hrtsegv",
    };
    const post = pathname.startsWith("/post/")
      ? getPostBySlug(pathname.slice("/post/".length))
      : undefined;
    const project = pathname.startsWith("/project/")
      ? projects.find(
          (item) => item.slug === pathname.slice("/project/".length),
        )
      : undefined;
    document.title = post
      ? `${post.frontmatter.title} — GopherLog`
      : project
        ? `${project.name} — hrtsegv`
        : titles[pathname] || "hrtsegv";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <PageTitle />
      <Suspense
        fallback={
          <Layout>
            <p className="loading-message" role="status">
              Loading article…
            </p>
          </Layout>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/categories"
            element={<Navigate to="/writing" replace />}
          />
          <Route
            path="*"
            element={
              <Layout>
                <div className="empty-state">
                  <h1>Page not found.</h1>
                  <a className="text-link" href="#/">
                    Return home →
                  </a>
                </div>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
