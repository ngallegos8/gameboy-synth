import Synth from "./components/Synth";
import About from "./pages/About";
import Manual from "./pages/Manual";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Synth />,
    errorElement: <ErrorPage />
  }, 
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path: "/manual",
    element: <Manual />,
    errorElement: <ErrorPage />
  }
];

export default routes;