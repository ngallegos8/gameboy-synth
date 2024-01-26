import App from "./App";
import Synth from "./pages/Synth";
import About from "./pages/About";
import Manual from "./pages/Manual";
import ErrorPage from "./pages/ErrorPage";
import NavBar from "./components/NavBar";



const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                // path: "/synth",
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
        ]
    }
];

export default routes;