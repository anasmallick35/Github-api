import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { Spinner } from "./components/Spinner";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Contact = lazy(() => import("./routes/Contact"));
const Error = lazy(() => import("./routes/Error"));

const SuspenseLayout = () => (
  <Suspense fallback={<Spinner/>}>
    <Layout />
  </Suspense>
);

const router = createBrowserRouter([
    {
      path: "/",
      element: <SuspenseLayout />,
      errorElement: <Error />, 
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);
export default router;