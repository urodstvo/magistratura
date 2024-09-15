import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskPage } from "./pages/task1";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        index: true,
        element: <TaskPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
