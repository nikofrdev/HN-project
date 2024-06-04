import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NewsPage from "./components/pages/NewsPage";
import OneNewPage from "./components/pages/OneNewPage";

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <h1>Oppps</h1>,
      children: [
        { path: "/", element: <NewsPage /> },
        { path: "/news/:id", element: <OneNewPage /> },
      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
