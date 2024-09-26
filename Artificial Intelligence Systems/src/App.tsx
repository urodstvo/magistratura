import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskPage as Task1Page } from "./pages/task1";
import { TaskPage as Task2Page } from "./pages/task2";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/task1",
        element: <Task1Page />,
      },
      {
        path: "/task2",
        element: <Task2Page />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
